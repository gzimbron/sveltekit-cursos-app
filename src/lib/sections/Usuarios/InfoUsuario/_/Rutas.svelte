<!-- Muestra las rutas asignadas a un usuario -->

<script>

	import Alerta from "$core/classes/Alerta";
	import Buscador from "./Buscador.svelte";
	import Ruta from "./Ruta.svelte";

    export let usuarioRutas = [];
    export let idUsuario;
    //let agregarCurso;
    let agregarRuta;

    /*function abrirBuscadorCurso(){
        agregarCurso = !agregarCurso;
    }*/

    function abrirBuscadorRuta(){
        agregarRuta = !agregarRuta;
    }

    /*async function asignarCurso(e){
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
        

    }*/

    async function asignarRuta(e){
        let existe;
        const ruta = e.detail.objeto;
        
        usuarioRutas.forEach(element => {
            const rutaId = element.attributes.ruta.data.id;
            if(rutaId === ruta.id){
                existe = true;
                Alerta.error("Esta ruta ya está asignada");
                return
            }
        })
        if(existe) return;

        let response = await fetch("/api/agregarUsuarioRuta", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({idUsuario: idUsuario, idRuta: ruta.id})
        })

        if(response.ok){
            Alerta.success("Se asignó la ruta con éxito.")
        } else {
            Alerta.error("Algo salió mal al asignar la ruta.")
        }

        const rutaReturn = await response.json();

        usuarioRutas = [...usuarioRutas, rutaReturn.data];

        document.getElementById("busquedaRutas").value = "";
    
    }

    async function quitarRuta(idEliminar){ 

		const response = await fetch('/api/quitarRuta', {
			method: 'POST',
			body: JSON.stringify(idEliminar),
			headers: {
				'Content-Type': 'application/json'
			}
		});
            
        if(response.ok){
            Alerta.success("¡Ruta eliminada con éxito!");
            usuarioRutas = usuarioRutas.filter(item => {
                return item.id != idEliminar;
            })
        } else{
            Alerta.error("Hubo un error al eliminar la ruta.")
        }

	}

    function confirmacion(e){

        // Lanza una alerta de confirmación
        Alerta.customQuestion('¿Desea quitar este curso?')
        .then((result) => {
            if(result.isConfirmed){
                quitarRuta(e.detail.id);
            }
        })

    }

</script>

<div class="cursos"> 

    <!--<button class="btn variant-filled-tertiary block w-fit mx-auto my-5" on:click={abrirBuscadorCurso}>{agregarCurso ? "Cerrar" : "Agregar curso"}</button>

    {#if agregarCurso}
        <Buscador endpoint={"Cursos"} on:agregado={asignarCurso}/>
    {/if}-->

    <button class="btn variant-filled-secondary block w-fit mx-auto my-5" on:click={abrirBuscadorRuta}>{agregarRuta ? "Cerrar" : "Agregar ruta"}</button>

    {#if agregarRuta}
        <Buscador endpoint={"Rutas"} on:agregado={asignarRuta}/>
    {/if}

    <div class="listado-cursos">

        {#key usuarioRutas}
            {#each usuarioRutas as usuarioRuta}
                <Ruta usuarioRuta={usuarioRuta} on:quitarRuta={confirmacion}/>
            {:else}    
                <p>No hay rutas asignadas.</p>
            {/each}
            
        {/key}
        
    </div>
</div>

<style lang="postcss">

    .listado-cursos {
            @apply grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
        }

</style>