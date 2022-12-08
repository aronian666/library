import ActiveRecord from "./ActiveRecord";
const assignId = (record, object) => object.id = record.id
export default class Author extends ActiveRecord {
    constructor({ id, name, created_at } = {}) {
        super(Author)
        this.id = id
        this.name = name
        this.created_at = created_at
    }
    static properties = "id,name,created_at"
    new = [
        { name: "Autor", type: "text", required: true, key: "name", placeholder: "J.K. Rowlling", onEnter: assignId }
    ]
    static name = "Author"
}