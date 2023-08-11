<script lang="ts">
	import MisCursos from "$sections/CursosUsuario/MisCursos.svelte";
    import FormVerificacion from "$sections/CursosUsuario/FormVerificacion.svelte";
	import { onMount } from "svelte";
    import { userStore } from '$core/stores/user.store';
    import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    //export let data;


</script>
<svelte:head>
    <title>Mis cursos</title>
</svelte:head>

<MisCursos idUsuario={$userStore.id}/>
