<script>
	import Loading from "$lib/svgs/Loading.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 style="text-align: center;">Hola!</h1>
<section>
	<Loading width="50rem" height="50rem" />
</section>

<style>
	section {
		display: grid;
		place-content: center;
	}
</style>
