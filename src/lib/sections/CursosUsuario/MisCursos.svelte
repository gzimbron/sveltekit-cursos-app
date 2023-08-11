<script>
	import { onMount } from "svelte";
	import CursoUsuario from "./_/CursoUsuario.svelte";
	import Loading from "$components/Loading.svelte";

    //export let cursos;
    export let idUsuario;
    let cursos = [];

    /*async function obtenerCursos(){
        let loading = true;
        const response = await fetch('/api/obtenerCursos', {
            method: 'POST',
            body: JSON.stringify({idUsuario: idUsuario}),
            headers: {
				'Content-Type': 'application/json'
			} 
        });
        cursos = await response.json();
        loading = false;
    }

    onMount(obtenerCursos);*/

    let loading = true;
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

        {/await}
        

    </div>

</main>



<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>
