<script>
    export let array = [];
    export let page = 0;
    export let count = 10;
    $: pages = parseInt(array.length / count);
    $: paginate = array.slice(page * count, (page + 1) * count);
</script>

<section {...$$restProps}>
    <slot items={paginate} />
    <div class="flex align-items space-between">
        <ul>
            {#each Array(pages + 1).fill(0) as p, i}
                <li>
                    <button
                        class:active={page === i}
                        on:click={(e) => (page = i)}>{i + 1}</button
                    >
                </li>
            {/each}
        </ul>
        <div class="gray">{paginate.length} de {array.length} resultados</div>
    </div>
</section>

<style>
    ul {
        display: flex;
        gap: 0.5rem;
        list-style-type: none;
    }
    button {
        width: 2rem;
        aspect-ratio: 1;
        padding: 0;
    }
    .active {
        color: white;
        background-color: black;
    }
</style>
