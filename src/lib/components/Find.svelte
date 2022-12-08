<script>
    import { searchArray } from "$lib/Search";
    let search = "";
    export let array = [];
    export let searched = [];
    export let properties;
    $: {
        searched = searchArray(array, search, properties);
    }
</script>

<input
    type="search"
    name="search"
    id="search"
    bind:value={search}
    {...$$restProps}
/>
