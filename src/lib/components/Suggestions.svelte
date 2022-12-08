<script>
    export let suggestions;
    export let selected;
    export let property = "name";
</script>

<ul on:mouseleave={(e) => (selected = -1)}>
    {#each suggestions as suggestion, i}
        <li
            on:mouseenter={(e) => (selected = i)}
            class:selected={selected === i}
            on:click
            {...$$restProps}
        >
            {suggestion[property]}
        </li>
    {/each}
</ul>

<style>
    ul {
        width: 100%;
    }
    ul {
        position: absolute;
        padding: 0;
        list-style: none;
        margin: 0;
        z-index: 1;
        border-radius: 0 0 0.75rem 0.75rem;
        border: 2px solid var(--gray);
        background-color: white;
    }
    li {
        padding: 0.5rem 1rem;
    }
    li:last-child {
        border-radius: 0 0 0.75rem 0.75rem;
    }
    li:hover {
        cursor: pointer;
    }
    .selected {
        background-color: #f7f7f7;
    }
</style>
