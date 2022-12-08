<script>
    import Back from "$lib/svgs/Back.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const goSomeWhereBack = () => {
        goto(
            $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf("/"))
        );
    };
</script>

<section>
    <Back
        fill="black"
        width="2rem"
        height="2rem"
        on:click={goSomeWhereBack}
        style="cursor: pointer"
    />
</section>

<style>
    section {
        padding: 1rem;
    }
</style>
