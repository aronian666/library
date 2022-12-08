import { Author, Editorial, Area } from "$lib/Models"
export const load = async () => {
    const [authors, editorials, areas] = await Promise.all([Author.all(), Editorial.all(), Area.all()])
    return {
        authors: authors.data,
        editorials: editorials.data,
        areas: areas.data
    }
}