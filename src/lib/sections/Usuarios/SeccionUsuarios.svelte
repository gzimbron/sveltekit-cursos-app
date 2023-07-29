<script>
	import Alert from '$components/Alert.svelte';
	import { createEventDispatcher } from "svelte";
	import UsuarioItem from "./_/UsuarioItem.svelte";
    import Alerta from '$core/classes/Alerta';

    let visible = false;
    let idEliminar;
    const dispatch = createEventDispatcher();


    /**  @type {import('$core/entities/Usuario').default[]} */
    export let usuarios = [];

    function handleEliminar(e){

        visible = true;
        idEliminar = e.detail.id;

    }

    async function aceptar(){
        visible = false;

        const response = await fetch('/api/eliminarUsuario', {
            method: 'POST',
            body: JSON.stringify(idEliminar),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            Alerta.success("¡Usuario eliminado con éxito!");
            usuarios = usuarios.filter(item => {
                return item.id != idEliminar;
            })
        } else{
            console.log(response)
            Alerta.error("Hubo un error al eliminar el usuario.")
        }
        
        
    }

    function cancelar(){
        visible = false;
    }
    
</script>

{#if visible}
    <Alert mensaje="¿Desea eliminar ese usuario?" 
    on:aceptar={aceptar} 
    on:cancelar={cancelar} />
{/if}

<div class="max-w-2xl my-10 mx-auto">

    <table class="table-auto w-full mx-auto">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Provider</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            
            {#key usuarios}
                {#each usuarios as usuario}
                    <UsuarioItem usuario={usuario} on:eliminarUsuario={handleEliminar}/>
                {/each}
            {/key}
            

        </tbody>
    </table>

</div>

<style lang="postcss">

    th{
        @apply p-3
    }

    th{
        border-bottom: 3px solid white;
    }

</style>