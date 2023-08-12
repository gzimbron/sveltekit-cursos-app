<script>
	import Alerta from "$core/classes/Alerta";
	import CursoItem from "./_/CursoItem.svelte";

    export let cursos = [];

    async function handleEliminar(e){

        Alerta.customQuestion('¿Desea eliminar este curso?')
        .then((result) => {
            if(result.isConfirmed){
                consulta(e.detail.id);
            }
        })

    }

    async function consulta(id){

        const response = await fetch('/api/eliminarCurso', {
				method: 'POST',
				body: JSON.stringify(id),
				headers: {
					'Content-Type': 'application/json'
				} 
			});

        if(response.ok){
            
            Alerta.success("¡Usuario eliminado con éxito!");
            cursos = cursos.filter(item => {
                return item.id != id;
            })
        } else {

            Alerta.error("Hubo un error al eliminar el usuario.")

        }
    }

</script>

<div class="listado-cursos">
 
    {#each cursos as curso}
        <CursoItem curso={curso} on:eliminarCurso={handleEliminar}/>
    {/each}

</div>

<style lang="postcss">

    .listado-cursos {
        @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>