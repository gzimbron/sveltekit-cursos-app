<script>

	import SeccionUsuarios from "$sections/Usuarios/SeccionUsuarios.svelte";

    /** @type {import("./$types").PageData} */
    export let data;

</script>

<svelte:head>
    <title>Usuarios</title>
</svelte:head>

<h1 class="w-fit mx-auto my-5 text-2xl">Listado de usuarios</h1>

<a href="usuarios/agregarUsuario" class="btn variant-filled-tertiary block w-fit mx-auto my-5">Agregar usuario</a>

<SeccionUsuarios usuarios={data.usuarios} />