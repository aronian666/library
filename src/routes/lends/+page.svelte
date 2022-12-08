<script>
    import { Lend } from "$lib/Models";
    import Pagination from "$lib/components/Pagination.svelte";
    import Find from "$lib/components/Find.svelte";
    import Lends from "$lib/components/Lends.svelte";
    import Table from "$lib/components/Table.svelte";
    export let data;
    let lends = data.lends.map((lend) => new Lend(lend));
    let searched = [];
</script>

<section class="grid gap2">
    <Find
        array={lends}
        bind:searched
        properties={{ book: { name: true }, student: { fullName: true } }}
        placeholder="Buscar estudiantes o libros"
    />
    <Lends lends={searched} let:items let:active>
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
</section>
