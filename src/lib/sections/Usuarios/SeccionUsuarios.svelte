<!-- Sección que muestra los usuarios -->

<script>
	import UsuarioItem from "./_/UsuarioItem.svelte";
    import Alerta from '$core/classes/Alerta';

    /**  @type {import('$core/entities/Usuario').default[]} */
    export let usuarios = [];

    function handleEliminar(e){

        Alerta.customQuestion('¿Desea eliminar este usuario?')
        .then((result) => {
            if(result.isConfirmed){
                consulta(e.detail.id);
            }
        })
    }

    // Elimina un usuario
    async function consulta(id){

        const response = await fetch('/api/eliminarUsuario', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            Alerta.success("¡Usuario eliminado con éxito!");
            usuarios = usuarios.filter(item => {
                return item.id != id;
            })
        } else{

            Alerta.error("Hubo un error al eliminar el usuario.");

        }
    }
    
</script>

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