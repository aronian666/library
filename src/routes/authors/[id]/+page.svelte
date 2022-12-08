<script>
    import { Author, Book } from "$lib/Models";
    import Pagination from "$lib/components/Pagination.svelte";
    import Table from "$lib/components/Table.svelte";
    export let data;
    let author = new Author(data.author);
    let books = data.books.map((book) => new Book(book));
    let properties = Book.new;
    properties.splice(1, 1);
</script>

<h1>{author.name}</h1>
<Pagination array={books} let:items class="grid gap2">
    <Table array={items} {properties} />
</Pagination>
