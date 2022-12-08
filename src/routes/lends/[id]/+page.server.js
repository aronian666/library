import { Lend } from "$lib/Models"
export const load = async ({ params }) => {
    const { id } = params
    const lend = await Lend.findById(id)
    return {
        lend
    }
}