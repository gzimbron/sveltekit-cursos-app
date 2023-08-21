<script>

	import Loading from "$components/Loading.svelte";
	import Alerta from "$core/classes/Alerta";
    import { rutaId } from "$core/stores/curso.store";
	import { modalStore } from "@skeletonlabs/skeleton";
	import RutaCard from "./RutaCard.svelte";
	import Buscador from "$sections/Usuarios/InfoUsuario/_/Buscador.svelte";


    let nombre, descripcion, activo, cursosAgregados, info, resultados;
    let cursos = [];
    // Recibe el ID de la ruta del store
    let id = $rutaId;
    let loading = false;
    let resultadosBusqueda;
    let buscador;

    // Obtiene la información actual del curso para colocarla en el formulario
    async function getData(){

        // Set ID a null
        rutaId.set(null);

        let consulta = await fetch('/api/getInfoRuta', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'},
        })
        if(!consulta.ok){
            throw new Error("Error al obtener la información del usuario.")
        }
        consulta = await consulta.json();

        info = consulta.data[0]; 

        nombre = info.attributes.nombre;
        descripcion = info.attributes.descripcion;
        activo = info.attributes.activo;
        cursosAgregados = info.attributes.cursos.data;
        
        }

    async function handleSubmit(){

        // Si no hay cursos agregados lanza una alerta
        if(cursosAgregados.length == 0){
            Alerta.error("Agregue cursos a la ruta.")
            return;
        }

        // Crea una lista con las IDs de los cursos asignados
        const ids = cursosAgregados.map(curso => curso.id);

        const jsonRequest = {
            data:{
                nombre: nombre,
                descripcion: descripcion,
                activo: activo,
                cursos: {
                    connect: ids
                }
            },
            id: id,

        }
  
        loading = true;
        let response = await fetch('/api/updateRuta', {
            method: 'POST',
            body: JSON.stringify(jsonRequest),
            headers: { 'Content-Type': 'application/json'}
        })
        if(!response.ok){
            modalStore.close();
            Alerta.error("Hubo un error al actualizar la información del curso.")
            return;
        }
        location.reload();

    }

    function eliminarCurso(e){

        // Elimina el curso de la lista de cursos 
        cursosAgregados = cursosAgregados.filter(curso => {
            return curso.id != e.detail.id;
        });
    }

    async function handleInput(e){

        // Esta función busca en la API cursos cuyo nombre coincida con lo ingresado en el input
        // y coloca los nombres dentro de un datalist.
        resultadosBusqueda.innerHTML = "";
        const nombreCurso = e.target.value;

        resultados = await fetch('/api/buscarCursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCurso: nombreCurso
            })
            
        })
        .then(res => res.json())
        .then(res => {
            res.data.forEach(elemento => {
                // Agrega los resultados a la datalist
                const opcion = document.createElement("option");
                opcion.value = elemento.attributes.nombre;
                resultadosBusqueda.appendChild(opcion);
            });

            cursos = res.data;

        })

    }

    function agregarCurso(e){

        let existe;

        // Verifica que el curso no esté agregado ya
        if(cursos[0]){
            cursosAgregados.forEach(element => {
                if(element.id == cursos[0].id){
                    Alerta.error("Ese curso ya está agregado a esta ruta.");
                    existe = true;
                    return;
                }
            })
            // si el curso ya está agregado, termina la función
            if(existe) return;

            // Agrega el curso a la lista y reinicia el buscador
            cursosAgregados = [...cursosAgregados, cursos[0]];
            buscador.value = "";

        } else {
            return;
        }

    }

    let promise = getData();

</script>

<div class="p-10 bg-surface-700">

    {#await promise}
        <Loading />
    {:then info}
        
        <form>
    
            <h2>Editar usuario</h2>

            <label for="nombre">Nombre: <input type="text" name="nombre" bind:value={nombre}></label>

            <label for="descripcion">Descripción: <input type="text" name="descripcion" bind:value={descripcion}></label>

            <label for="activo">Activo: <input type="checkbox" name="activo" bind:checked={activo}></label>

            <p>Cursos:</p>

            <div id="buscador" class="mb-5">
                <label for="busquedaCursos">Agregar cursos: 
                    <input bind:this={buscador} list="cursos"
                    id="busquedaCursos" 
                    placeholder="Buscar un curso..." 
                    on:input={handleInput}/>
                    <datalist bind:this={resultadosBusqueda} id="cursos">
                        
                    </datalist>
                </label>
    
                <button on:click={agregarCurso} class="btn variant-filled-tertiary block w-fit mx-auto">Agregar curso</button>
    
            </div>

            {#each cursosAgregados as curso}
                <RutaCard curso={curso} on:eliminarCurso={eliminarCurso}/>
            {/each}

            {#if loading}
                <Loading />
            {:else}
                <button on:click={handleSubmit} class="w-full btn variant-filled-primary mt-5">Subir</button>
            {/if}

        </form>
    
        {:catch}

            <div class="alert-message bg-warning-600 p-10 rounded-lg">
                <p>Hubo un error.</p>
            </div>

    {/await}

</div>

<style lang="postcss">

    label{
            @apply my-5;
    }

    input[type="text"]{
        @apply text-black h-7 rounded-md w-full;
    }

    #busquedaCursos{
        @apply text-black h-7 rounded-md w-full;
    }

</style>