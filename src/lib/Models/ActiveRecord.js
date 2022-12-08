import { supabase } from "../supabaseClient";

export default class ActiveRecord {
    #creator
    constructor(model) {
        this.creator = model
    }
    get creator() { return this.#creator }
    set creator(model) { this.#creator = model }
    #flat() {
        return this.new.map((item) => {
            if (item.type === "Array") {
                return item.values
            }
            return item
        }).flat()
    }
    async toObject() {
        const copy = {}
        await Promise.all(this.#flat().map(async ({ key, type }) => {
            if (type === "object") {
                if (!this[key].id) return copy[key] = (await this[key].create()).id
                return copy[key] = this[key].id
            }
            return copy[key] = this[key]
        }))
        return copy
    }
    async create(properties = "id") {
        const copy = await this.toObject()
        const response = await supabase.from(this.creator.tableName).insert([
            copy
        ]).select(properties)
        if (response.error) console.log("Ocurrio un error", response.error)
        return response.data[0]
    }
    async update(params) {
        const copy = params || await this.toObject()
        const response = await supabase.from(this.creator.tableName).update(copy).eq('id', this.id)
        return response
    }
    async delete() {
        const response = await supabase.from(this.creator.tableName).delete().eq("id", this.id)
        return response
    }
    static get tableName() {
        return this.name.toLowerCase() + "s"
    }
    static properties = "*"
    static async all(properties, order = "created_at") {
        return await supabase.from(this.tableName).select(properties || this.properties).order(order, { ascending: false })
    }
    static find(properties) {
        return supabase.from(this.tableName).select(properties || this.properties)
    }
    static async findById(id) {
        const { data } = await supabase.from(this.tableName).select(this.properties).eq("id", id).limit(1).single()
        return data
    }
    async file(file) {
        const extension = file.name.split(".").pop()
        const path = `/${this.#creator.tableName}/${this.id}.${extension}`
        await supabase.storage.from("books").upload(path, file)
        const { data } = supabase.storage.from('books').getPublicUrl(path)
        return data
    }
}