<script>
	import CursoUsuario from "./_/CursoUsuario.svelte";


    export let cursos;

</script>

<main class="my-10 mx-5">

    <h1 class="mx-auto w-fit text-3xl mb-10">Mis cursos</h1>


    <div class="listado-cursos">

        {#each cursos as curso}
            <CursoUsuario usuarioCurso={curso}/>
        {/each}

    </div>

</main>



<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>
