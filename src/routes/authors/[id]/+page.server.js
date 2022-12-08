import { Book, Author } from "$lib/Models"

export const load = async ({ params }) => {
    const { id } = params
    const [author, books] = await Promise.all([Author.findById(id), Book.find().eq("author", id)])
    return { author, books: books.data }
}