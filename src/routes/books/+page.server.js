import { Book, Author, Area, Editorial } from "$lib/Models"
export const load = async () => {
    const [books, authors, areas, editorials] = await Promise.all([
        Book.all(),
        Author.all(),
        Area.all(),
        Editorial.all(),
    ]);
    const suggestions = [
        books.data,
        authors.data,
        areas.data,
        editorials.data,
    ].flat();
    return {
        suggestions,
        books: books.data
    }
}