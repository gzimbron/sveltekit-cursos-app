<script>
	import CursoUsuario from "./_/CursoUsuario.svelte";
	import Loading from "$components/Loading.svelte";
	import { fade } from "svelte/transition";

    export let idUsuario;
    let cursos = [];

    let loading = true;

    // Carga los cursos de la BD
    cursos = fetch('/api/obtenerCursos', {
        method: 'POST',
        body: JSON.stringify({idUsuario: idUsuario}),
        headers: {
			'Content-Type': 'application/json'
		} 
    }).then(response => response.json())


    loading = false;

</script>

<main class="my-10 mx-5">

    <h1 class="mx-auto w-fit text-3xl mb-10">Mis cursos</h1>


    <div class="listado-cursos">

        {#await cursos}
            <Loading />
        {:then cursos} 
            {#each cursos as curso}
                <CursoUsuario usuarioCurso={curso}/>
            {:else}
                <p>No hay cursos asignados.</p>
            {/each}
        {:catch}    
            <aside class="alert variant-filled-error w-modal-slim mx-auto my-5" 
            transition:fade|local={{duration: 200}}>
        
                <div class="alert-message">
                    <h3 class="h3">Error</h3>
                    <p>Error al obtener los cursos.</p>
                </div>
        
            </aside>
        {/await}
        

    </div>

</main>



<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>
