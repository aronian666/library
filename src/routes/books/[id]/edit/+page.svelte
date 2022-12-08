<script>
    import { Book } from "$lib/Models";
    import Fielsets from "$lib/components/Fielsets.svelte";
    import { goto } from "$app/navigation";
    import Back from "$lib/components/Back.svelte";
    import { loading } from "$lib/loading";
    export let data;
    let book = new Book(data.book);
    book.author.suggestions = data.authors;
    book.editorial.suggestions = data.editorials;
    book.area.suggestions = data.areas;
    const createBook = async () => {
        $loading = true;
        const response = await book.update();
        goto("/books/" + book.id);
    };
</script>

<Back />
<h1 style="text-align: center;">Editar</h1>
<form on:submit|preventDefault={createBook}>
    <Fielsets object={book} entries={book.new} />
    <button style="color:white; background: var(--orange)">Editar</button>
</form>
