<script>
    import { searchArray } from "$lib/Search.js";
    import { Book } from "$lib/Models";
    import Give from "$lib/svgs/Give.svelte";
    import Details from "$lib/svgs/Details.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import Input from "$lib/components/Input.svelte";
    import Excel from "$lib/svgs/Excel.svelte";
    import { toXLSX } from "$lib/utils.js";
    export let data;
    let suggestions = data.suggestions;
    let books = data.books.map((book) => new Book(book));
    let query = "";

    $: filtered = searchArray(books, query, {
        author: { name: true },
        name: true,
        editorial: { name: true },
        area: { name: true },
    });
</script>

<svelte:head>
    <title>Buscar libros</title>
</svelte:head>
<section class="flex gap space-between">
    <Input
        type="search"
        placeholder="Busca libros, autores o areas"
        bind:value={query}
        {suggestions}
    />
    <div class="flex gap">
        <button
            style="color: white; background: #10793F"
            on:click={(e) => toXLSX(books, Book.new, "book")}
        >
            <Excel width="1rem" height="1rem" fill="white" />
            Descargar
        </button>
        <a href="/books/new" class="button">Agregar Libro</a>
    </div>
</section>
<Pagination array={filtered} count={9} let:items class="grid gap2">
    <section class="grid auto-fill gap2">
        {#each items as book}
            <div class="book">
                <h3>{book.name}</h3>
                <div class="grid gap2">
                    <div class="grid gap">
                        <a href={`/authors/${book.author.id}`} class="gray"
                            >{book.author.name}</a
                        >
                        <p class={book.status.toLowerCase() + " bold"}>
                            {book.status}
                        </p>
                    </div>
                    <div class="grid auto-fit gap" style="--size:100px">
                        {#if book.quantity > 0}
                            <a
                                class="button"
                                href={`/lends/new?book=${book.id}`}
                                style="background-color: var(--blue); color: white"
                            >
                                <Give width="1rem" height="1rem" fill="white" />
                                Prestar
                            </a>
                        {/if}
                        <a
                            class="button"
                            href={`/books/${book.id}`}
                            style="background-color: var(--cyan); color: white"
                        >
                            <Details width="1rem" height="1rem" fill="white" />
                            Detalles
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </section>
</Pagination>

<style>
    .disponible {
        color: var(--green);
    }
    .agotado {
        color: var(--red);
    }
    .book {
        padding: 1rem;
        border-radius: 1rem;
        border: 2px solid var(--gray);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        justify-content: space-between;
    }
</style>
