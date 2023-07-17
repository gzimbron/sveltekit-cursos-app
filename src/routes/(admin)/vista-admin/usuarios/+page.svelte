<script>
	import ListadoUsuarios from "$sections/Usuarios/ListadoUsuarios.svelte";

    /** @type {import("./$types").PageData} */
    export let data;

</script>

<h1 class="mx-auto my-3 w-fit">Listado de usuarios</h1>

<ListadoUsuarios usuarios={data.usuarios}/>