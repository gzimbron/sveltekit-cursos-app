<script>
	import { goto } from '$app/navigation';
	import Paginator from '$components/Paginator.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import MovieItem from './_/MovieItem.svelte';

	/**  @type {import('$modules/movies/domain/Pelicula').default[]} */
	export let peliculas = [];

	export let total_pages = 0;

	export let pagina = 1;

	const goToIndex = () => {
		goto('/');
	};

	const cambioDePagina = ({ detail: toPage }) => {
		goto(`/peliculas/${toPage}`);
	};
</script>

<svelte:head>
	<title>Películas populares :: Página {pagina}</title>
</svelte:head>

<div class="appbar-container">
	<AppBar>
		<svelte:fragment slot="lead">
			<button class="btn btn-icon" on:click={goToIndex}>
				<i class="fa-solid fa-arrow-left text-2xl" />
			</button>
		</svelte:fragment>

		<h1 class="text-xl">Películas populares</h1>
	</AppBar>
</div>
<main>
	<Paginator page={pagina} total={total_pages} on:pageChange={cambioDePagina} />

	<div class="listado-peliculas">
		{#each peliculas as pelicula}
			<MovieItem {pelicula} />
		{/each}
	</div>

	<Paginator page={pagina} total={total_pages} on:pageChange={cambioDePagina} />
</main>

<style lang="postcss">
	.appbar-container {
		@apply fixed top-0 w-full z-10;
	}
	main {
		@apply container mx-auto px-4 mt-24 pb-4;
	}
	.listado-peliculas {
		@apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
	}
</style>
