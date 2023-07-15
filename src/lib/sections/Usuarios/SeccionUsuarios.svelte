<script>

	import UsuarioItem from "./_/UsuarioItem.svelte";


    /**  @type {import('$core/entities/Usuario').default[]} */
    export let usuarios = [];
    
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
            
            {#each usuarios as usuario}
                <UsuarioItem usuario={usuario} />
            {/each}

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