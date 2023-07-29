<script>
	import { createEventDispatcher } from 'svelte';

    /**  @type {import('$core/entities/Ruta').default} */
    export let ruta;
    
    const dispatch = createEventDispatcher()

    async function handleClick(id){

        dispatch('eliminarRuta', {
            id: id
        })

    }

</script>

<tr>

    <td>{ruta.id}</td>
    <td>{ruta.name}</td>
    <td>{ruta.descripcion}</td>
    {#if ruta.activo}
        <td>🟢</td>
    {:else}
        <td>🔴</td>
    {/if}
    <td><button class="bg-red-700 p-1" on:click={() => {handleClick(ruta.id)}}>Eliminar</button></td>
    
</tr>

<style lang="postcss">

    td{
        @apply text-center py-3
    }

</style>