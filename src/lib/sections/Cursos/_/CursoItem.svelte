<!-- Elemento curso para la vista de administrador -->

<script>
	import { createEventDispatcher } from 'svelte';

	export let curso;
	const dispatch = createEventDispatcher();

	async function handleClick(id) {
		dispatch('eliminarCurso', {
			id: id
		});
	}
	
</script>

<div class="card overflow-hidden">
	<div class="relative">
		<button
			on:click={() => {
				handleClick(curso.id);
			}}
			class="bg-red-700 absolute top-2 right-2 p-1 z-20">Eliminar</button
		>
	</div>
	<header>
		<img src={curso.imagenURL} class="bg-black/50 w-full" alt="Post" />
	</header>
	<h2 class="p-4">{curso.name}</h2>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<p class="italic">{curso.descripcion}</p>
			<small>
				{#if curso.activo}
					🟢
				{:else}
					🔴
				{/if}</small
			>
		</div>
		<a class="block" href={curso.cursoURL}>Ir al curso</a>
	</footer>
</div>
