<script >
    import { fade } from "svelte/transition"
	import SeccionCursos from "$sections/Cursos/SeccionCursos.svelte";

    export let data;

</script>

<svelte:head>
    <title>Cursos</title>
</svelte:head>

<h1 class="w-fit mx-auto my-5 text-2xl">Cursos</h1>

<a href="cursos/agregarCurso" class="btn variant-filled-tertiary block w-fit mx-auto my-5">Agregar curso</a>

{#if data.error}
    <aside class="alert variant-filled-error w-modal-slim mx-auto my-5" 
    transition:fade|local={{duration: 200}}>

        <div class="alert-message">
            <h3 class="h3">Error</h3>
            <p>{data.error.message}</p>
        </div>

    </aside>
{/if}

<main>
    <SeccionCursos cursos={data.cursos}/>
</main>


<style lang="postcss">

    main{
        @apply container mx-auto px-4 mt-10 pb-4;
    }
</style>

