<script>
    import { Area, Book } from "$lib/Models";
    import Pagination from "$lib/components/Pagination.svelte";
    import Table from "$lib/components/Table.svelte";
    export let data;
    let area = new Area(data.area);
    let books = data.books.map((book) => new Book(book));
    let properties = Book.new;
    properties.splice(2, 1);
</script>

<h1>{area.name}</h1>
<Pagination array={books} let:items class="grid gap2">
    <Table array={items} {properties} />
</Pagination>
