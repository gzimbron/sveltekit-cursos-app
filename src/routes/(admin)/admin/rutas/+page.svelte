<script>
    import { fade } from "svelte/transition"
	import SeccionRutas from "$sections/Rutas/SeccionRutas.svelte";

    /** @type {import("./$types").PageData} */
    export let data;

</script>

<svelte:head>
    <title>Rutas</title>
</svelte:head>

<h1 class="w-fit mx-auto my-5 text-2xl">Rutas</h1>

<a href="/admin/rutas/agregarRuta" class="btn variant-filled-tertiary block w-fit mx-auto">Agregar ruta</a>

{#if data.error}
    <aside class="alert variant-filled-error w-modal-slim mx-auto my-5" 
    transition:fade|local={{duration: 200}}>

        <div class="alert-message">
            <h3 class="h3">Error</h3>
            <p>{data.error.message}</p>
        </div>

    </aside>
{/if}

<SeccionRutas rutas={data.rutas}/>