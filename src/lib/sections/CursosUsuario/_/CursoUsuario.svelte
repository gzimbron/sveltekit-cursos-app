<script>

	export let usuarioCurso;
    let curso = usuarioCurso.attributes.curso.data.attributes;

	async function handleClick(id) {

		await fetch("/api/terminarCurso", {
			method: "POST",
			headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(id)
		})

		usuarioCurso.attributes.terminado = true;
	}

</script>

<div class="card overflow-hidden">

	<header>
		<img src={curso.imagenURL} class="bg-black/50 w-full" alt="Post" />
	</header>
	<h2 class="p-4">{curso.nombre}</h2>
	<p class="italic px-4">{curso.descripcion}</p>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">

			<span>
				{#if usuarioCurso.attributes.terminado}
					Completado
				{:else}
					Incompleto
				{/if}</span>
		</div>
		<a class="block" href={curso.cursoURL}>Ir al curso</a>
	</footer>
	{#if !usuarioCurso.attributes.terminado}
	<button class="mx-auto p-2 rounded mb-5 block bg-tertiary-500" 
		on:click={() => handleClick(usuarioCurso.id)}>Marcar como completado</button>
	{/if}
	
</div>
