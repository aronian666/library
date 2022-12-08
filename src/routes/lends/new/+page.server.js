import { Student, Book } from "$lib/Models"
export const load = async () => {
    const [students, books] = await Promise.all([Student.all(), Book.find().gt("quantity", 0)])
    return {
        students: students.data,
        books: books.data
    }
}