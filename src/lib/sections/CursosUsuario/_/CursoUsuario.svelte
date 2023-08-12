<script lang="ts">
	import { cursoId, imagenURL } from '$core/stores/curso.store';
	import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
	import FormVerificacion from "../FormVerificacion.svelte";
	import Loading from '$components/Loading.svelte';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import ImagenEvidencia from '$components/ImagenEvidencia.svelte';
	import Alerta from '$core/classes/Alerta';

	export let usuarioCurso;
    let curso = usuarioCurso.attributes.curso.data.attributes;
	let btnVisible = true;
	let textoBtn;
	let loading = false;
	let unsuscribe;

	unsuscribe = imagenURL.subscribe((value) => {
		if(value != null) usuarioCurso.attributes.verificacion = value;
	});

	$: if(usuarioCurso.attributes.terminado && !usuarioCurso.attributes.verificacion){

			textoBtn = "Agregar evidencia";
		} else if(usuarioCurso.attributes.terminado && usuarioCurso.attributes.verificacion){
			btnVisible = false;
		} else {
			textoBtn = "Marcar como completado"
		}
	
	async function handleClick() {

		if(!usuarioCurso.attributes.terminado){

			loading = true;
			let result = await fetch("/api/terminarCurso", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(usuarioCurso.id)
			})
			result = await result.json();
			console.log(result);
			
			if(result.data){
				usuarioCurso.attributes.terminado = true;
				loading = false;
				textoBtn = "Agregar evidencia"
			} else {
				loading = false;
				Alerta.error(result.message)
				return;
			}

			
		}

		cursoId.set(usuarioCurso.id);

		const modalComponent: ModalComponent = {
            ref: FormVerificacion,
        };

        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent
        }
        modalStore.trigger(modal);

	}

	function mostrarEvidencia(){
		
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

	onDestroy(unsuscribe);
	

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
	{#if loading}
		<Loading />
	{:else}
		{#if btnVisible}
		<button class="mx-auto p-2 rounded mb-5 block bg-tertiary-500" 
			on:click={handleClick}
			id="button">{textoBtn}</button>
		{:else}
			<button class="mx-auto p-2 rounded mb-5 block bg-tertiary-500" 
			on:click={mostrarEvidencia}
			id="button">Ver evidencia</button>
		{/if}
	{/if}
	
	
</div>
