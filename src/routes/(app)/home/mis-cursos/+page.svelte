<script lang="ts">
	import MisCursos from "$sections/CursosUsuario/MisCursos.svelte";
    import FormVerificacion from "$sections/CursosUsuario/FormVerificacion.svelte";
	import { onMount } from "svelte";
    import { userStore } from '$core/stores/user.store';
    import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    //export let data;

    function hola(){

        const modalComponent: ModalComponent = {
            ref: FormVerificacion,

        };

        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent
        }
        modalStore.trigger(modal);
    }


</script>
<svelte:head>
    <title>Mis cursos</title>
</svelte:head>

<button on:click={hola}>Modal</button>

<MisCursos idUsuario={$userStore.id}/>

<!--cursos={data.data}-->