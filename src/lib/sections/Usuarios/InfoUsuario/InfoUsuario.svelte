<script>
	import Alerta from "$core/classes/Alerta";
    import Alert from '$components/Alert.svelte';
	import Buscador from "./_/Buscador.svelte";
    import Curso from "./_/Curso.svelte";

    export let usuario;
    export let usuarioCursos = [];
    let visible = false;
    let agregarCurso = false;
    let idEliminar;

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
            body: JSON.stringify({idUsuario: usuario.id, idCurso: curso.id})
        })

        if(response.ok){
            Alerta.success("Se asignó el curso con éxito.")
        } else {
            Alerta.error("Algo salió mal al asignar el curso.")
        }

        //response = await response.json();

        document.getElementById("busquedaCursos").value = "";
        /*console.log(curso)
        console.log(usuarioCursos)*/
        //usuarioCursos = [...usuarioCursos, response.data];
        location.reload();
    }

    function quitarCurso(e){
        visible = true;
        idEliminar = e.detail.id;
    }

    function cancelar(){
        visible = false;
    }

    async function aceptar(){
        visible = false;

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
            <Buscador on:cursoAgregado={asignarCurso}/>
        {/if}

        {#if visible}
            <Alert mensaje="¿Desea quitar este curso?"
            on:aceptar={aceptar}
            on:cancelar={cancelar}/>
        {/if}

        <div class="listado-cursos">

            {#key usuarioCursos}
                {#each usuarioCursos as usuarioCurso}
                    <Curso usuarioCurso={usuarioCurso} on:quitarCurso={quitarCurso}/>
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
