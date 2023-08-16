<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import { rutaId } from '$core/stores/curso.store';
	import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    import EditarRuta from './EditarRuta.svelte';

    /**  @type {import('$core/entities/Ruta').default} */
    export let ruta;
    
    const dispatch = createEventDispatcher()

    async function eliminar(){

        dispatch('eliminarRuta', {
            id: ruta.id
        })

    }

    async function editar(){

        // Guarda el ID de la ruta en store para acceder desde EditarCurso
		// Abre el modal con el componente EditarCurso
		rutaId.set(ruta.id);
        const modalComponent: ModalComponent = {
            ref: EditarRuta,
        };

        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent
        }
        modalStore.trigger(modal);

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
    <td><button class="bg-red-700 p-1" on:click={eliminar}>Eliminar</button></td>
    <td><button class="bg-primary-600 p-1" on:click={editar}>Editar</button></td>
    
</tr>

<style lang="postcss">

    td{
        @apply text-center py-3
    }

</style>