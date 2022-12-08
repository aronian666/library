<script>
    import Suggestions from "./Suggestions.svelte";

    export let value = "";
    export let onEnter;
    export let id;
    export let suggestions = [];
    export let property = "name";
    export let onReset;
    let selected = -1;
    $: filter = suggestions.filter((v) =>
        v[property].toLowerCase().includes(value.toLowerCase())
    );
    let open = false;
</script>

<div>
    <input
        {...$$restProps}
        {id}
        name={id}
        autocomplete="off"
        bind:value
        on:focus={(e) => (open = true)}
        on:blur={(e) => {
            const found = suggestions.find(
                (item) => item[property].toLowerCase() === value.toLowerCase()
            );
            if (found && onEnter) onEnter(found);
            setTimeout(() => {
                open = false;
                selected = -1;
            }, 100);
        }}
        on:keydown={(e) => {
            if (!suggestions.length) return;
            if (e.keyCode === 9) return;
            if (e.keyCode === 27) {
                open = false;
                selected = -1;
                return;
            }
            if (e.keyCode === 40 || e.keyCode === 38) {
                e.preventDefault();
                if (e.keyCode === 40 && selected < filter.length - 1)
                    selected++;
                if (e.keyCode === 38 && selected >= 0) selected--;
                return;
            }
            if (e.key == "Enter") {
                e.preventDefault();
                open = false;
                if (selected != -1) value = filter[selected][property];
                onEnter && onEnter(filter[selected]);
                return;
            }

            onReset && onReset();
            selected = -1;
            open = true;
        }}
    />
    {#if filter.length && open}
        <Suggestions
            suggestions={filter.slice(0, 5)}
            {property}
            bind:selected
            on:click={(e) => {
                value = filter[selected][property];
                onEnter && onEnter(filter[selected]);
                open = false;
            }}
        />
    {/if}
</div>

<style>
    div {
        position: relative;
        min-width: 300px;
    }
</style>
