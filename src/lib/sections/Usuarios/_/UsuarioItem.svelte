<!-- Este elemento muestra información del usuario en la tabla de Seccionusuarios -->

<script>
	import { createEventDispatcher } from "svelte";


    export let usuario;

    const dispatch = createEventDispatcher();

    async function handleClick(id){

        // Levanta un evento a SeccionUsuarios para que elimine al usuario 
        dispatch('eliminarUsuario', {
            id: id
        });
            
    }

</script>

<tr class="">
    
    <td><a href={`/admin/usuarios/usuario/${usuario.id}`}>{usuario.id}</a></td>
    <td><a href={`/admin/usuarios/usuario/${usuario.id}`}>{usuario.name}</a></td>
    <td><a href={`/admin/usuarios/usuario/${usuario.id}`}>{usuario.email}</a></td>
    <td><a href={`/admin/usuarios/usuario/${usuario.id}`}>{usuario.provider}</a></td>
    <td><button class="bg-red-700 p-1" on:click={()=>{handleClick(usuario.id)}}>Eliminar</button></td>

</tr>

<style lang="postcss"> 

    td{
        @apply text-center py-3
    }

</style>