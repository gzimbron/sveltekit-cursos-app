<!-- Elemento curso para la vista de administrador -->

<script lang="ts">
	import { cursoId } from '$core/stores/curso.store';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import EditarCurso from './EditarCurso.svelte';

	export let curso;
	const dispatch = createEventDispatcher();

	// Levanta evento para eliminar el curso
	async function eliminar(id) {
		dispatch('eliminarCurso', {
			id: id
		});
	}

	// Editar el curso
	async function editar(id){

		// Guarda el ID del curso en store para acceder desde EditarCurso
		// Abre el modal con el componente EditarCurso
		cursoId.set(id);
        const modalComponent: ModalComponent = {
            ref: EditarCurso,
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
				editar(curso.id);
			}}
			class="bg-primary-600 absolute top-2 left-2 p-1 z-20">Editar</button>
		<button
			on:click={() => {
				eliminar(curso.id);
			}}
			class="bg-red-700 absolute top-2 right-2 p-1 z-20">Eliminar</button>
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
