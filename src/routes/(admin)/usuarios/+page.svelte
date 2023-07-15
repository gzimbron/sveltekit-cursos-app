<script>
	import { goto } from "$app/navigation";
	import SeccionUsuarios from "$sections/Usuarios/SeccionUsuarios.svelte";

    /** @type {import("./$types").PageData} */
    export let data;

</script>

<button on:click={() => goto("/usuarios/agregarUsuario")} class="btn variant-filled-tertiary block my-10 mx-auto">Agregar usuario</button>

<SeccionUsuarios usuarios={data.usuarios} />