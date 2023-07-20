<script>
	import { createEventDispatcher } from "svelte";


    export let usuario;

    const dispatch = createEventDispatcher();

    async function handleClick(id){

        const confirmacion = window.confirm('¿Eliminar este usuario?');
        if(confirmacion){
            
            const response = await fetch('/api/eliminarUsuario', {
                method: 'POST',
                body: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch('eliminarUsuario', {
                id: id
            });
            
        }

    }

</script>



<tr class="">
    
    <td>{usuario.id}</td>
    <td>{usuario.name}</td>
    <td>{usuario.email}</td>
    <td>{usuario.provider}</td>
    <td><button class="bg-red-700 p-1" on:click={()=>{handleClick(usuario.id)}}>Eliminar</button></td>

</tr>

<style lang="postcss">

    td{
        @apply text-center py-3
    }

</style>