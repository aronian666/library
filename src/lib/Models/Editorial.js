import ActiveRecord from "./ActiveRecord";
const assignId = (record, object) => object.id = record.id
export default class Editorial extends ActiveRecord {
    constructor({ id, name, created_at } = {}) {
        super(Editorial)
        this.id = id
        this.name = name
        this.created_at = created_at
    }
    static properties = "id,name,created_at"
    new = [
        { name: "Editorial", type: "text", required: true, key: "name", model: Editorial, placeholder: "La pandilla", onEnter: assignId }
    ]
    static name = "Editorial"
}