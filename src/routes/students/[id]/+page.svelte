<script>
    import { Lend, Student } from "$lib/Models";
    import Pagination from "$lib/components/Pagination.svelte";
    import Table from "$lib/components/Table.svelte";
    import Lends from "$lib/components/Lends.svelte";
    export let data;
    let student = new Student(data.student);
    let lends = data.lends.map((lend) => new Lend(lend));
</script>

<h1>{student.fullName}</h1>

<Lends {lends} let:items let:active>
    <Pagination array={items} let:items class="grid gap2">
        <Table
            array={items}
            properties={active ? Lend.actives : Lend.returned}
            let:item
        >
            {#if active}
                <td>
                    <a href={`/lends/${item.id}`}>Devolver</a>
                </td>
            {/if}
        </Table>
    </Pagination>
</Lends>
