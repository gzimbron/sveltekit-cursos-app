<!-- Muestra los cursos asignados a un usuario -->

<script>

	import Alerta from "$core/classes/Alerta";
	import { onMount } from "svelte";
	import Buscador from "./Buscador.svelte";
	import Curso from "./Curso.svelte";
	import Loading from "$components/Loading.svelte";

    export let idUsuario;
    let agregarCurso;
    let usuarioCursos = [];
    let loading = false;

    onMount(obtenerUsuarioCursos);

    async function obtenerUsuarioCursos(){
        loading = true;
        let cursos = await fetch('/api/obtenerUsuarioCursos', {
            method: 'POST',
            body: JSON.stringify(idUsuario),
            headers: {'content-type': 'application/json'}
        })
        cursos = await cursos.json();
        console.log(cursos)
        usuarioCursos = cursos;
        loading = false;
    }

    function abrirBuscadorCurso(){
        agregarCurso = !agregarCurso;
    }

    async function asignarCurso(e){
        let existe;
        const curso = e.detail.objeto;

        usuarioCursos.forEach(element => {
            const cursoId = element.attributes.curso.data.id;
            if(cursoId === curso.id){
                existe = true;
                Alerta.error("Este curso ya está asignado");
                return
            }
        })
        if(existe) return;

        let response = await fetch("/api/agregarUsuarioCurso", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({idUsuario: idUsuario, idCurso: curso.id})
        })

        if(response.ok){
            Alerta.success("Se asignó el curso con éxito.")
        } else {
            Alerta.error("Algo salió mal al asignar el curso.")
        }

        const cursoReturn = await response.json();

        usuarioCursos = [...usuarioCursos, cursoReturn.data];

        document.getElementById("busquedaCursos").value = "";
        

    }

    async function quitarCurso(idEliminar){ 

		const response = await fetch('/api/quitarCurso', {
			method: 'POST',
			body: JSON.stringify(idEliminar),
			headers: {
				'Content-Type': 'application/json'
			}
		});
            
        if(response.ok){
            Alerta.success("¡Curso eliminado con éxito!");
            usuarioCursos = usuarioCursos.filter(item => {
                return item.id != idEliminar;
            })
        } else{
            Alerta.error("Hubo un error al eliminar el curso.")
        }

	}

    function confirmacion(e){

        // Lanza una alerta de confirmación
        Alerta.customQuestion('¿Desea quitar este curso?')
        .then((result) => {
            if(result.isConfirmed){
                quitarCurso(e.detail.id);
            }
        })
    }

</script>

<div class="cursos"> 

    <button class="btn variant-filled-tertiary block w-fit mx-auto my-5" on:click={abrirBuscadorCurso}>{agregarCurso ? "Cerrar" : "Agregar curso"}</button>

    {#if agregarCurso}
        <Buscador endpoint={"Cursos"} on:agregado={asignarCurso}/>
    {/if}

    {#if loading}
        <Loading />
    {:else}

        <div class="listado-cursos">

            {#key usuarioCursos}
                {#each usuarioCursos as usuarioCurso}
                    <Curso usuarioCurso={usuarioCurso} on:quitarCurso={confirmacion}/>
                {/each}
            {/key}
            
        </div>

    {/if}

</div>

<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
        }

</style>