<script>
	import { page } from "$app/stores";
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
				<a href="/">Inicio</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/books")
					? "page"
					: undefined}
			>
				<a href="/books">Libros</a>
			</li>
			<li
				aria-current={$page.url.pathname.startsWith("/lends")
					? "page"
					: undefined}
			>
				<a href="/lends">Prestamos</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		border-bottom: 2px solid var(--gray);
		padding: 1rem;
	}
	ul {
		display: flex;
		align-items: cneter;
		list-style: none;
		gap: 1rem;
		justify-content: center;
	}
	li {
		display: flex;
	}
	a {
		font-size: 1.25rem;
		text-decoration: none;
		padding: 0.6rem 0.75rem;
	}
	li[aria-current="page"] > a {
		background-image: linear-gradient(
			60deg,
			#348f50 0%,
			#56b4d3 50%,
			#cff3ff 100%
		);
		border-radius: 1rem;
		color: white;
	}
</style>
