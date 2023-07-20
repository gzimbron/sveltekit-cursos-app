<script>
	import RutaItem from './_/RutaItem.svelte';


    /**  @type {import('$core/entities/Ruta').default[]} */
    export let rutas = [];

    async function eliminarRuta(e){
        rutas = rutas.filter(ruta => ruta.id != e.detail.id)
    }

</script>

<div class="max-w-2xl my-10 mx-auto">

    <table class="table-auto w-full mx-auto">

        <thead>

            <tr>

                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th></th>

            </tr>

        </thead>

        <tbody>

            {#key rutas}
                {#each rutas as ruta}
                    <RutaItem ruta={ruta} on:eliminarRuta={eliminarRuta}/>
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