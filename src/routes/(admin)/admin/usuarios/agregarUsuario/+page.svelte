<script>
	import { Toast, toastStore } from '@skeletonlabs/skeleton';

	import FormularioUsuario from "$sections/Usuarios/agregarUsuario/FormularioUsuario.svelte";
	import Mensaje from '$components/Mensaje.svelte';
	import { onMount } from 'svelte';

	/** @type {import('./$types').ActionData} */
	export let form;

	onMount(() => {
		if(form.success){
			/**import("@skeletonlabs/skeleton").ToastSettings*/
			const t = {
			message: "Usuario agregado exitosamente",
			background: "variant-filled-success",
			};
			toastStore.trigger(t);
		} else{
			/**import("@skeletonlabs/skeleton").ToastSettings*/
			const t = {
			message: "montao",
			background: "variant-filled-success",
			};
			toastStore.trigger(t);

		}
	})

</script>

<h1 class="my-5 w-fit mx-auto text-2xl">Agregar usuario</h1>

<a href="/admin/usuarios" class="btn variant-filled-tertiary block w-fit my-5 mx-auto">Volver</a>

<FormularioUsuario />

<!--{#if form.success}
	<Mensaje texto={"Usuario agregado"} color={"success"}/>
{/if}-->