<script>
    import { Book } from "$lib/Models";
    import Fielsets from "$lib/components/Fielsets.svelte";
    import Back from "$lib/components/Back.svelte";
    import { goto } from "$app/navigation";
    import { loading } from "$lib/loading";
    export let data;
    let book = new Book();
    book.author.suggestions = data.authors;
    book.editorial.suggestions = data.editorials;
    book.area.suggestions = data.areas;
    const createBook = async () => {
        $loading = true;
        const { id } = await book.create();
        goto("/books/" + id);
    };
</script>

<svelte:head>
    <title>Agregar libro</title>
</svelte:head>
<Back />
<h1 style="text-align: center;">Agregar libro</h1>
<form on:submit|preventDefault={createBook}>
    <Fielsets object={book} entries={book.new} />
    <button>Agregar</button>
</form>
