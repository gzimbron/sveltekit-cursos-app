<script>
	/**  @type {import('$modules/movies/domain/Pelicula').default} */
	export let pelicula;

	const dateParser = Intl.DateTimeFormat('es-MX', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="card overflow-hidden">
	<header>
		<img src={pelicula.image} class="bg-black/50 w-full aspect-[2/3]" alt="Post" />
	</header>
	<h2 class="p-4">{pelicula.title}</h2>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<p class="italic">{dateParser.format(pelicula.releaseDate)}</p>
			<small>{pelicula.vote_average} ⭐️</small>
		</div>
	</footer>
</div>
