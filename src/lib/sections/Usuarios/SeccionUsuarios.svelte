<script>
	import { createEventDispatcher } from "svelte";

	import UsuarioItem from "./_/UsuarioItem.svelte";
    let alert = false;
    const dispatch = createEventDispatcher();


    /**  @type {import('$core/entities/Usuario').default[]} */
    export let usuarios = [];

    function handleEliminar(e){

        usuarios = usuarios.filter(item => {
            return item.id != e.detail.id;
        })

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