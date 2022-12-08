import { Area, Book } from "$lib/Models"

export const load = async ({ params }) => {
    const { id } = params
    const [area, books] = await Promise.all([Area.findById(id), Book.find().eq("area", id)])
    return { area, books: books.data }
}