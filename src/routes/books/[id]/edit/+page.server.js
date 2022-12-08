import { Book, Author, Editorial, Area } from "$lib/Models"
export const load = async ({ params }) => {
    const { id } = params
    const [book, authors, editorials, areas] = await Promise.all([Book.findById(id), Author.all(), Editorial.all(), Area.all()])
    return {
        authors: authors.data,
        editorials: editorials.data,
        areas: areas.data,
        book,
    }

}