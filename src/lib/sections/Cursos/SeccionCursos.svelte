<script>
	import Alerta from "$core/classes/Alerta";
    import Alert from "$lib/components/Alert.svelte"
	import CursoItem from "./_/CursoItem.svelte";

    export let cursos = [];
    let visible = false;
    let idEliminar;

    function handleEliminar(e){

        visible = true;
        idEliminar = e.detail.id;

    }

    async function aceptar(){
        visible = false;

        const response = await fetch('/api/eliminarCurso', {
				method: 'POST',
				body: JSON.stringify(idEliminar),
				headers: {
					'Content-Type': 'application/json'
				} 
			});

        if(response.ok){
            Alerta.success("¡Usuario eliminado con éxito!");
            cursos = cursos.filter(item => {
                return item.id != idEliminar;
            })
        } else{
            Alerta.error("Hubo un error al eliminar el usuario.")
        }
    }

    function cancelar(){
        visible = false;
    }

</script>

{#if visible}
    <Alert mensaje="¿Desea eliminar ese curso?" 
    on:aceptar={aceptar} 
    on:cancelar={cancelar} />
{/if}

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