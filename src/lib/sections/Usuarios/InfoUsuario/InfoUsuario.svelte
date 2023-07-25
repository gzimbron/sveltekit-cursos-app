<script>
	import Buscador from "./_/Buscador.svelte";
import Curso from "./_/Curso.svelte";

    export let usuario;
    export let usuarioCursos = [];
    let agregarCurso = false;

    function abrirBuscador(){
        agregarCurso = !agregarCurso;
    }

</script>

<main  class="my-10 mx-5">

    <div class="w-fit mx-auto">
        <h3>USUARIO</h3>
        <span class="text-5xl">{usuario.attributes.nombre}</span>
    
        <div class="flex justify-center gap-5 mt-5">
            <div>
                <h3 class="text-lg">Correo electrónico</h3>
                <span>{usuario.attributes.email}</span>
            </div>
    
            <div>
                <h3 class="text-lg">Proveedor</h3>
                <span>{usuario.attributes.provider}</span>
            </div>
    
        </div>
    </div>


    <div class="cursos">


        <button class="btn variant-filled-tertiary block w-fit mx-auto my-5" on:click={abrirBuscador}>{agregarCurso ? "Cerrar" : "Agregar curso"}</button>

        {#if agregarCurso}
            <Buscador idUsuario={usuario.id}/>
        {/if}

        <div class="listado-cursos">

            {#key usuarioCursos}
                {#each usuarioCursos as usuarioCurso}
                    <Curso usuarioCurso={usuarioCurso}/>
                {/each}
            {/key}
            
        </div>
    </div>

</main>

<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
        }

</style>
