import Author from "./Author";
import Area from "./Area.js"
import Editorial from "./Editorial";
import ActiveRecord from "./ActiveRecord";
const assignId = (record, object) => object.id = record.id

export default class Book extends ActiveRecord {
    constructor({ id, name, author, area, editorial, created_at, position, quantity, image } = {}) {
        super(Book)
        this.id = id
        this.name = name
        this.author = new Author(author)
        this.area = new Area(area)
        this.editorial = new Editorial(editorial)
        this.position = position
        if (created_at) this.created_at = new Date(created_at)
        this.quantity = quantity
        this.image = image
    }
    get status() {
        if (this.quantity) return "Disponible"
        return "Agotado"
    }
    static new = [
        {
            name: "Libro",
            key: "name",
            type: "text",
            placeholder: "Harry potter",
            required: true,
            href(book) { return `/books/${book.id}` },
        },
        {
            name: "Autor",
            key: "author",
            type: "object",
            placeholder: "J. K. Rowlling",
            transform(author) { return author.name },
            href(author) { return `/authors/${author.id}` }
        },
        { name: "Area", key: "area", type: "object", placeholder: "Fantasia", transform(author) { return author.name }, href(area) { return `/areas/${area.id}` } },
        { name: "Editorial", key: "editorial", type: "object", placeholder: "Las palmeras", transform(author) { return author.name } },
        { name: "Posicion", key: "position", type: "number", placeholder: "2", required: true },
        { name: "Cantidad", key: "quantity", type: "number", placeholder: "10", required: true }
    ]
    new = [
        { name: "Libro", key: "name", type: "text", placeholder: "Harry potter", required: true },
        { name: "Autor", key: "author", type: "object", placeholder: "J. K. Rowlling" },
        {
            type: "Array", values: [
                { name: "Area", key: "area", type: "object", placeholder: "Fantasia" },
                { name: "Editorial", key: "editorial", type: "object", placeholder: "Las palmeras", },
            ]
        },

        {
            type: "Array", values: [
                { name: "Posicion", key: "position", type: "number", placeholder: "2", required: true },
                { name: "Cantidad", key: "quantity", type: "number", placeholder: "10", required: true }
            ]
        }

    ]
    static properties = "id,name,author(id, name),area(id, name),editorial(id,name),created_at,position,quantity,image"
    static name = "Book"
}