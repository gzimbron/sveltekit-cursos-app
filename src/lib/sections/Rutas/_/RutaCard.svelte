<script>
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let curso;

    function handleClick(id) {

        dispatch('eliminarCurso', {
            id: id
        })

    }

</script>

<div class="card flex justify-start items-center space-x-4 max-w-xl">
    <img src={curso.attributes.imagenURL} alt="Post">
    <h3>{curso.attributes.nombre}</h3>
    <p>{curso.attributes.descripcion}</p>
    {#if curso.attributes.activo}
        <p>🟢</p>
    {:else}
        <p>🔴</p>
    {/if}
    <button on:click={() => {handleClick(curso.id)}}>Eliminar</button>
</div>

<style>
    img {
        width: 10%;
    }
</style>