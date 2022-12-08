import ActiveRecord from "./ActiveRecord";
const assignId = (record, object) => object.id = record.id
export default class Area extends ActiveRecord {
    constructor({ id, name, created_at } = {}) {
        super(Area)
        this.id = id
        this.name = name
        if (created_at) this.created_at = new Date(created_at)
    }
    static properties = "id,name,created_at"
    new = [
        { name: "Area", type: "text", required: true, key: "name", model: Area, placeholder: "Fantasia", onEnter: assignId }
    ]
    static name = "Area"
}