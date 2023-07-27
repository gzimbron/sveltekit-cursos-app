<script>
	import SeccionRutas from "$sections/Rutas/SeccionRutas.svelte";

    /** @type {import("./$types").PageData} */
    export let data;

</script>



<svelte:head>
    <title>Rutas</title>
</svelte:head>

<h1 class="w-fit mx-auto my-5 text-2xl">Rutas</h1>

<a href="/admin/rutas/agregarRuta" class="btn variant-filled-tertiary block w-fit mx-auto">Agregar ruta</a>

<SeccionRutas rutas={data.rutas}/>