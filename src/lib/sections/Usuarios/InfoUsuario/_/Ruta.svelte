<!-- Elemento ruta para el apartado de usuarios de la vista de administrador -->

<script lang="ts">

	import { createEventDispatcher } from "svelte";


	export let usuarioRuta;
    let ruta = usuarioRuta.attributes.ruta.data.attributes || null;

	const dispatch = createEventDispatcher()

	async function handleClick(id) {

		// Levanta un evento a Cursos para que quite el curso de la vista y de la BD
		dispatch('quitarRuta', {
			id: id
		})

	}

</script>

<div class="card overflow-hidden">
	<div class="relative">
		<button
			on:click={() => {
				handleClick(usuarioRuta.id);
			}}
			class="bg-red-700 absolute top-2 right-2 p-1 z-20">Quitar</button
		>
	</div>

	<h2 class="p-4">{ruta.nombre}</h2>
	<hr class="opacity-50" />
	<footer class="p-4 flex justify-start items-center space-x-4">
		<div class="flex-auto flex justify-between items-center">
			<p class="italic">{ruta.descripcion}</p>
		</div>
		<a class="block" href="si">Ver cursos</a>
	</footer>

</div>
