<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Input from "./Input.svelte";
    let query = $page.url.searchParams.get("query") || "";
    export let suggestions = [];
    const onEnter = () => {
        const { url } = $page;
        url.search = new URLSearchParams({ query });
        goto(url);
    };
</script>

<Input
    bind:value={query}
    bind:suggestions
    id="search"
    type="search"
    {onEnter}
    placeholder="Buscar libros, authors, areas y editoriales"
/>
