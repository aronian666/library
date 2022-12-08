import { Book, Lend } from "$lib/Models"
export const load = async ({ params }) => {
    const { id } = params
    const [book, lends] = await Promise.all([
        Book.findById(id),
        Lend.find(
            "id, book(id, name), student(id, name, last_name), return_date, created_at, return_day, message"
        ).eq("book", id).order("created_at", { ascending: false })
    ])
    return { book, lends: lends.data }
}