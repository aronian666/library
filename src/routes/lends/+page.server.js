import { Lend } from "$lib/Models"
export const load = async () => {
    const { data } = await Lend.all()
    return { lends: data }
}