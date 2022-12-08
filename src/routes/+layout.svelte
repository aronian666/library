<script>
	import Header from "./Header.svelte";
	import { loading } from "$lib/loading";
	import Loading from "$lib/svgs/Loading.svelte";
	import { page, navigating } from "$app/stores";
	import PageTransition from "./PageTransition.svelte";
	$: $loading = !!$navigating;
</script>

{#if $loading}
	<div class="loading">
		<Loading width="50rem" height="50rem" />
		<h2 style="text-align: center; margin-top: 2rem">Espera por favor!</h2>
	</div>
{:else}
	<div class="app">
		<Header />

		<PageTransition url={$page.url.href}>
			<slot />
		</PageTransition>
	</div>
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.loading {
		min-height: 100vh;
		display: grid;
		place-content: center;
	}
</style>
