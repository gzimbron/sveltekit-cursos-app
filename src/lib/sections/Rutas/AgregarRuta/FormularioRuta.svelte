<script>
	import Alerta from "$core/classes/Alerta";
	import RutaCard from "../_/RutaCard.svelte";

    let resultados;
    let cursos = [];
    let cursosAgregados = [];
    let resultadosBusqueda;
    let buscador;
    let nombre, descripcion;

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
            // Si el curso está agregado, termina la función
            if(existe) return;

            // Agrega el curso a la lista y reinicia el buscador
            cursosAgregados = [...cursosAgregados, cursos[0]];
            buscador.value = "";

        } else {
            return
        }

    }

    function eliminarCurso(e){
        // Elimina el curso de la lista de cursos
        cursosAgregados = cursosAgregados.filter(curso => {
            return curso.id != e.detail.id;
        });

    }

    async function agregarRuta(e){

        // Si no hay cursos en la lista, lanza una alerta
        if(cursosAgregados.length == 0){
            Alerta.error("Agregue cursos a la ruta.")
            return;
        }
        
        //const nombre = document.querySelector("#nombreRuta").value;
        //const descripcion = document.querySelector("#descripcionRuta").value;

        // Asigna el valor de los radio buttons de activo o inactivo
        const radioButtons = document.getElementsByName("estadoRuta");
        let estado;
        for (const button of radioButtons) {
            if (button.checked) {
                estado = button.value;
                break;
            }
        }

        // Hace una lista de las IDs de los cursos agregados
        const ids = cursosAgregados.map(curso => curso.id);
        
        const jsonRequest = {
            "data":{
                "nombre": nombre,
                "descripcion": descripcion,
                "activo": estado,
                "cursos": {
                    "connect": ids
                }
            }
        }

        // Hace la consulta al endpoint para agregar la ruta
        let response = await fetch('/api/agregarRuta',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonRequest)
        })

        if(response.ok){
            response = await response.json();
            if(response.data){
                Alerta.success("¡Se ha agregado la ruta!")
                document.getElementById("nueva-ruta").reset();
                cursosAgregados = [];
            } else{
                Alerta.error(response.message, {
                    title: "Error al agregar la ruta."
                })
            }
            
        } else{
            Alerta.error("Hubo un error al agregar la ruta.")
            }
        
    }

</script>

<main class="max-w-xl mx-auto">

    <form action="" class="w-fit mx-auto mb-5" id="nueva-ruta">

        <label for="nombreRuta">Nombre de la ruta: <input type="text" id="nombreRuta" bind:value={nombre}/></label>

        <label for="descripcionRuta">Descripción de la ruta: <input type="text" id="descripcionRuta" bind:value={descripcion}/></label>

        <input type="radio" id="activo" name="estadoRuta" value="1" checked>
        <label for="activo" class="estado">Activo</label>

        <input type="radio" id="inactivo" name="estadoRuta" value="0">
        <label for="inactivo" class="estado">Inactivo</label>

        <div id="buscador">
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

    </form>

    <div id="resultadosBusqueda">

        {#if cursosAgregados.length > 0}
            <h3 class="w-fit mx-auto my-5">Cursos agregados a la ruta:</h3>
        {/if}
        
        {#key cursosAgregados}
            {#each cursosAgregados as curso}
                <RutaCard curso={curso} on:eliminarCurso={eliminarCurso}/>
            {/each}
        {/key}
        
    </div>
    
    <button on:click={agregarRuta} class="btn block my-5 mx-auto bg-yellow-400 text-black">Agregar ruta</button>
</main>

<style lang="postcss">

    label{
        @apply my-2;
    }

    label{
            @apply my-5;
    }

    input:not([type="radio"]){
        @apply text-black h-7 rounded-md w-full;
    }

    .estado{
        @apply inline mx-3;
    }

    #busquedaCursos{
        @apply text-black h-7 rounded-md w-full;
    }

</style>