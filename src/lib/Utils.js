import { utils, writeFile } from "xlsx";
export async function toXLSX(array, properties, name) {
    const columnLengths = properties.map(() => ({ wch: 20 }))
    const workbook = utils.book_new();
    const data = [properties.map(r => r.name)]
    array.forEach(result => {
        const row = properties.map(({ key, transform }) => transform ? transform(result[key]) : result[key])
        data.push(row)
    })
    const worksheet = utils.aoa_to_sheet(data)
    worksheet["!cols"] = columnLengths
    utils.book_append_sheet(workbook, worksheet, name + "s")
    writeFile(workbook, name + 's.xlsx');
}