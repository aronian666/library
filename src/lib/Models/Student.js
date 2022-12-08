import ActiveRecord from "./ActiveRecord";
export default class Student extends ActiveRecord {
    constructor({ id, name, last_name, created_at, grade, nivel = "Secundaria" } = {}) {
        super(Student)
        this.id = id
        this.name = name
        this.last_name = last_name
        this.create_at = created_at && new Date(created_at)
        this.grade = grade
        this.nivel = nivel
    }
    get fullName() {
        return `${this.name} ${this.last_name}`
    }
    new = [
        {
            type: "Array", values: [
                { name: "Nombre", key: "name", type: "text", placeholder: "Jonh", required: true },
                { name: "Apellidos", key: "last_name", type: "text", placeholder: "Doe", required: true },
            ]
        },
        {
            type: "Array", values: [
                { name: "Grado", key: "grade", type: "number", placeholder: "2", required: true },
                { name: "Nivel", key: "nivel", type: "text", placeholder: "Secundaria", options: ["Secundaria", "Primaria"] }
            ]
        }

    ]
    static properties = "id,name,created_at,nivel,grade,last_name"
    static name = "Student"
}