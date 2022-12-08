<script>
    import { fly } from "svelte/transition";
    export let url = "";
    const pageTransitionDuration = 300;
</script>

{#key url}
    <main
        in:fly={{
            x: -5,
            duration: pageTransitionDuration,
            delay: pageTransitionDuration,
        }}
    >
        <slot />
    </main>
{/key}

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
        gap: 1rem;
    }
</style>
