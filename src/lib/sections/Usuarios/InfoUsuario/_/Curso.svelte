<!-- Elemento curso para el apartado de usuarios de la vista de administrador -->

<script lang="ts">
	import { cursoId } from "$core/stores/curso.store";
	import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
	import { createEventDispatcher } from "svelte";
	import ImagenEvidencia from "$components/ImagenEvidencia.svelte";

	export let usuarioCurso;
    let curso = usuarioCurso.attributes.curso.data.attributes;
	let btnVisible = true;
	let btnTexto;

	if(usuarioCurso.attributes.terminado && usuarioCurso.attributes.verificacion){
		// Si el curso está terminado y hay verificación
		btnTexto = "Ver evidencia";
	} else if(usuarioCurso.attributes.terminado && !usuarioCurso.attributes.verificacion){
		// Si el curso está terminado y no hay verificación
		btnTexto = "No hay evidencia aún";
	} else {
		// Si el curso no está terminado
		btnVisible = false;
	}

	const dispatch = createEventDispatcher()

	async function handleClick(id) {

		// Levanta un evento a Cursos para que quite el curso de la vista y de la BD
		dispatch('quitarCurso', {
			id: id
		})

	}

	function mostrarEvidencia(){
		
		// Abre un modal que muestra la imagen de evidencia

		// Set ID del curso al store para que ImagenEvidencia pueda buscar la imagen
		cursoId.set(usuarioCurso.id);
		const modalComponent: ModalComponent = {
            ref: ImagenEvidencia,
        };

        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent
        }
        modalStore.trigger(modal);
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

	{#if btnVisible}
		<button class="mx-auto p-2 rounded mb-5 block bg-tertiary-500"
		disabled={!usuarioCurso.attributes.verificacion}
		on:click={mostrarEvidencia}>{btnTexto}</button>
	{/if}
</div>
