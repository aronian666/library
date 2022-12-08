<script>
    export let properties;
    export let array;
</script>

<table>
    <thead>
        <tr>
            {#each properties as { name }}
                <th>{name}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each array as item, index}
            <tr>
                {#each properties as { key, transform, href }}
                    <td>
                        {#if href}
                            <a href={href(item[key])}>
                                {transform ? transform(item[key]) : item[key]}
                            </a>
                        {:else}
                            {transform ? transform(item[key]) : item[key]}
                        {/if}
                    </td>
                {/each}
                <slot {item} {index} />
            </tr>
        {/each}
    </tbody>
</table>
