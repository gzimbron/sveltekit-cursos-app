<script>
	import CursoItem from "./_/CursoItem.svelte";


    export let cursos = [];

    function handleEliminar(e){

        cursos = cursos.filter(item => {
            return item.id != e.detail.id;
        })
    }

</script>

<div class="listado-cursos">

    {#key cursos}
        {#each cursos as curso}
            <CursoItem curso={curso} on:eliminarCurso={handleEliminar}/>
        {/each}
    {/key}
    

</div>

<style lang="postcss">

    .listado-cursos {
        @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>