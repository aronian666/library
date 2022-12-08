import ActiveRecord from "./ActiveRecord";
import Book from "./Book";
import Student from "./Student";
const assignId = (record, object) => object.id = record.id
export default class Lend extends ActiveRecord {
    constructor({ id, student, book, created_at, return_date, return_day, message } = {}) {
        super(Lend)
        this.id = id
        this.student = new Student(student)
        this.book = new Book(book)
        this.created_at = created_at && new Date(created_at)
        this.return_date = return_date && new Date(return_date)
        this.return_day = return_day && new Date(return_day)
        this.message = message
    }
    get days() {
        const difference = this.return_date.getTime() - Date.now()
        return Math.round(difference / 86400000)
    }
    static returned = [
        { key: "book", name: "Libro", transform(object) { return object.name }, href(book) { return `/books/${book.id}` } },
        { key: "student", name: "Estudiante", transform(object) { return object.fullName }, href(student) { return `/students/${student.id}` } },
        { key: "created_at", name: "Creacion", transform(date) { return date.toLocaleDateString() } },
        { key: "return_day", name: "Devolucion", transform(date) { return date.toLocaleDateString() } },
        { key: "message", name: "Observaciones" }
    ]
    static actives = [
        { key: "book", name: "Libro", transform(object) { return object.name }, href(book) { return `/books/${book.id}` } },
        { key: "student", name: "Estudiante", transform(object) { return object.fullName }, href(student) { return `/students/${student.id}` } },
        { key: "created_at", name: "Creacion", transform(date) { return date.toLocaleDateString() } },
        { key: "days", name: "Dias restantes" },
        { key: "return_date", name: "Fecha limite", transform(date) { return date.toLocaleDateString() } },
    ]
    new = [
        { key: "book", onEnter: assignId, type: "object" },
        { key: "student", onEnter: assignId, type: "object" },
        { key: "return_date", type: "date" }
    ]
    static properties = "id, student(id,name,last_name), created_at, return_date, book(id,name, quantity), return_day, message"
    static name = "Lend"
}