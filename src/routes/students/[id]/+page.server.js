import { Student, Lend } from "$lib/Models"
export const load = async ({ params }) => {
    const { id } = params
    const [student, lends] = await Promise.all([
        Student.findById(id),
        Lend.find(
            "id, book(id, name), student(id, name, last_name), return_date, created_at, return_day, message"
        ).eq("student", id).order("created_at", { ascending: false })
    ])
    return { student, lends: lends.data }
}