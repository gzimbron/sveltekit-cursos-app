<!-- Muestra los cursos asignados a un usuario -->

<script>

	import Alerta from "$core/classes/Alerta";
	import Buscador from "./Buscador.svelte";
	import Curso from "./Curso.svelte";

    export let usuarioCursos = [];
    export let idUsuario;
    let agregarCurso;

    function abrirBuscador(){
        agregarCurso = !agregarCurso;
    }

    async function asignarCurso(e){
        let existe;
        const curso = e.detail.curso;

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

    async function consulta(idEliminar){ 
        //visible = false;

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

    function quitarCurso(e){

        // Lanza una alerta de confirmación
        Alerta.customQuestion('¿Desea quitar este curso?')
        .then((result) => {
            if(result.isConfirmed){
                consulta(e.detail.id);
            }
        })
    }

</script>

<div class="cursos"> 

    <button class="btn variant-filled-tertiary block w-fit mx-auto my-5" on:click={abrirBuscador}>{agregarCurso ? "Cerrar" : "Agregar curso"}</button>

    {#if agregarCurso}
        <Buscador on:cursoAgregado={asignarCurso}/>
    {/if}

    <div class="listado-cursos">

        {#key usuarioCursos}
            {#each usuarioCursos as usuarioCurso}
                <Curso usuarioCurso={usuarioCurso} on:quitarCurso={quitarCurso}/>
            {/each}
        {/key}
        
    </div>
</div>

<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
        }

</style>