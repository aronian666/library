<script>
    export let lends;
    let active = true;
    $: actives = lends.filter((lend) => !!lend.return_day ^ active);
</script>

<div class="flex gap">
    <button class:active on:click={(e) => (active = true)}>Activos</button>
    <button class:active={!active} on:click={(e) => (active = false)}
        >Devueltos</button
    >
</div>

<slot items={actives} {active} />

<style>
    .active {
        background-color: var(--blue);
        color: white;
    }
</style>
