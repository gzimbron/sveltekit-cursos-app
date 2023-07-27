<script >

    import { toastStore } from "@skeletonlabs/skeleton";
    //import type { ToastSettings } from '@skeletonlabs/skeleton';
	import SeccionCursos from "$sections/Cursos/SeccionCursos.svelte";


    export let data;

    function triggerToast(){

        /**import("@skeletonlabs/skeleton").ToastSettings*/
        const t ={
            message: "hola",
        };
        toastStore.trigger(t);
    }

</script>

<svelte:head>
    <title>Cursos</title>
</svelte:head>

<h1 class="w-fit mx-auto my-5 text-2xl">Cursos</h1>

<a href="cursos/agregarCurso" class="btn variant-filled-tertiary block w-fit mx-auto my-5">Agregar curso</a>

<main>
    <SeccionCursos cursos={data.cursos}/>
</main>

<button on:click={triggerToast}>Yeah</button>

<style lang="postcss">

    main{
        @apply container mx-auto px-4 mt-10 pb-4;
    }
</style>

