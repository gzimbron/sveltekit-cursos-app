<script>

	export let usuarioCurso;
    let curso = usuarioCurso.attributes.curso.data.attributes;

	async function handleClick(id) {

		const confirmacion = window.confirm('¿Desea eliminar este curso?');
		if (confirmacion) {
			await fetch('/api/quitarCurso', {
				method: 'POST',
				body: JSON.stringify(id),
				headers: {
					'Content-Type': 'application/json'
				}
			});
            location.reload();
		}
	}

</script>

<div class="card overflow-hidden">
	<div class="relative">
		<button
			on:click={() => {
				handleClick(usuarioCurso.id);
			}}
			class="bg-red-700 absolute top-2 right-2 p-1 z-20">Quitar</button
		>
	</div>
	<header>
		<img src={curso.imagenURL} class="bg-black/50 w-full" alt="Post" />
	</header>
	<h2 class="p-4">{curso.nombre}</h2>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<p class="italic">{curso.descripcion}</p>
			<small>
				{#if usuarioCurso.attributes.terminado}
					Completado
				{:else}
					Incompleto
				{/if}</small>
		</div>
		<a class="block" href={curso.cursoURL}>Ir al curso</a>
	</footer>
</div>
