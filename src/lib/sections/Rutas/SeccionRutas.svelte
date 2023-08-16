<script>
	import RutaItem from './_/RutaItem.svelte';
    import Alerta from '$core/classes/Alerta';

    /**  @type {import('$core/entities/Ruta').default[]} */
    export let rutas = [];

    async function eliminarRuta(e){

        Alerta.customQuestion('¿Desea eliminar esta ruta?')
        .then((result) => {
            if(result.isConfirmed){
                consulta(e.detail.id);
            }
        })
    }

    async function consulta(id){
        const response = await fetch('/api/eliminarRuta', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            Alerta.success("¡Ruta eliminada con éxito!");
            rutas = rutas.filter(item => {
                return item.id != id;
            })
        } else{

            Alerta.error("Hubo un error al eliminar la ruta.");

        }
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