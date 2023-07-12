<script>
	import MoviesSection from '$sections/Movies/MoviesSection.svelte';

	/** @type {import("./$types").PageData} */
	export let data;
</script>

{#key data}
	<MoviesSection pagina={data.page} total_pages={data.total_pages} peliculas={data.peliculas} />
{/key}
