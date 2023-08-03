<script>
	import { onMount } from "svelte";
	import CursoUsuario from "./_/CursoUsuario.svelte";

    //export let cursos;
    export let idUsuario;
    let cursos = [];

    async function obtenerCursos(){
        const response = await fetch('/api/obtenerCursos', {
            method: 'POST',
            body: JSON.stringify({idUsuario: idUsuario}),
            headers: {
				'Content-Type': 'application/json'
			} 
        });
        cursos = await response.json();
    }

    onMount(obtenerCursos);

</script>

<main class="my-10 mx-5">

    <h1 class="mx-auto w-fit text-3xl mb-10">Mis cursos</h1>


    <div class="listado-cursos">

        {#await cursos}
            <p>si</p>
        {:then cursos} 
            {#each cursos as curso}
                <CursoUsuario usuarioCurso={curso}/>
            {:else}
                <p>si</p>
            {/each}

        {/await}
        

    </div>

</main>



<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
    }

</style>
