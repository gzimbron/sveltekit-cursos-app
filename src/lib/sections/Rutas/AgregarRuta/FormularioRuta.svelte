<script>
	import Alerta from "$core/classes/Alerta";
	import Curso from "$sections/Usuarios/InfoUsuario/_/Curso.svelte";
	import RutaCard from "../_/RutaCard.svelte";


    let resultados;
    let cursos = [];
    let cursosAgregados = [];

    async function handleInput(e){
        const resultadosBusqueda = document.getElementById("cursos")
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
                const opcion = document.createElement("option");
                opcion.value = elemento.attributes.nombre;
                resultadosBusqueda.appendChild(opcion);
            });

            cursos = res.data;

        })

    }

    function agregarCurso(e){

        let existe;
        if(cursos[0]){
            
            cursosAgregados.forEach(element => {
                if(element.id == cursos[0].id){
                    Alerta.error("Ese curso ya está agregado a esta ruta.");
                    existe = true;
                    return;
                }
            })
            if(existe) return;
            cursosAgregados = [...cursosAgregados, cursos[0]];
            const buscador = document.getElementById("busquedaCursos")
            buscador.value = "";

        } else {
            return
        }

    }

    function eliminarCurso(e){
        cursosAgregados = cursosAgregados.filter(curso => {
            return curso.id != e.detail.id;
        });

    }

    async function agregarRuta(e){

        if(cursosAgregados.length == 0){
            Alerta.error("Agregue cursos a la ruta.")
            return;
        }
        
        const nombre = document.querySelector("#nombreRuta").value;
        const descripcion = document.querySelector("#descripcionRuta").value;
        const radioButtons = document.getElementsByName("estadoRuta");
        let estado;
        for (const button of radioButtons) {
            if (button.checked) {
                estado = button.value;
                break;
            }
        }

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
            Alerta.error(
                "Hubo un error al agregar la ruta.")
        }
        
    }

</script>

<main class="max-w-xl mx-auto">

    <form action="" class="w-fit mx-auto mb-5" id="nueva-ruta">

        <label for="nombreRuta">Nombre de la ruta: <input type="text" id="nombreRuta" /></label>

        <label for="descripcionRuta">Descripción de la ruta: <input type="text" id="descripcionRuta" /></label>

        <input type="radio" id="activo" name="estadoRuta" value="1" checked>
        <label for="activo" class="estado">Activo</label>

        <input type="radio" id="inactivo" name="estadoRuta" value="0">
        <label for="inactivo" class="estado">Inactivo</label>

        <div id="buscador">
            <label for="busquedaCursos">Agregar cursos: 
                <input list="cursos"
                id="busquedaCursos" 
                placeholder="Buscar un curso..." 
                on:input={handleInput}/>
                <datalist id="cursos">
                    
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