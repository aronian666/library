<script>
    import Input from "./Input.svelte";
    export let object;
    export let entries;
</script>

{#each entries as { name, key, required, type, options, placeholder, onEnter, values }, i (i)}
    {#if type === "Array"}
        <div class="grid auto-fit gap2">
            <svelte:self entries={values} bind:object />
        </div>
    {:else if type === "object"}
        <svelte:self bind:object={object[key]} entries={object[key].new} />
    {:else}
        <p>
            <label for={`${object.constructor.name}[${key}]`}>{name}</label>
            {#if options}
                <div class="flex gap">
                    {#each options as option}
                        <label class="radio">
                            <input
                                type="radio"
                                bind:group={object[key]}
                                value={option}
                            />
                            {option}
                        </label>
                    {/each}
                </div>
            {:else}
                <Input
                    {type}
                    {required}
                    bind:value={object[key]}
                    {placeholder}
                    id={`${object.constructor.name}[${key}]`}
                    suggestions={object.suggestions || []}
                    onEnter={(seleted) => {
                        if (onEnter) onEnter(seleted, object);
                        object = object;
                    }}
                    onReset={(selected) => {
                        object.id = undefined;
                        object = object;
                    }}
                />
            {/if}
        </p>
    {/if}
{/each}

<style>
    p {
        display: grid;
        gap: 0.5rem;
    }
</style>
