<!-- Este elemento es el buscador para asignarle un curso o una ruta a un usuario -->
<!-- Recibe una variable que indica cuál endpoint utilizar -->
<!-- Funciona similar a el buscador de FormularioRuta -->

<script>
	import { createEventDispatcher } from "svelte";

    export let endpoint;
    let resultados;
    let objetos = [];
    const dispatch = createEventDispatcher(); 

async function handleInput(e){        
        const resultadosBusqueda = endpoint === "Cursos" ? document.getElementById("resultadosCursos") : document.getElementById("resultadosRutas");
        resultadosBusqueda.innerHTML = "";
        const nombre = e.target.value;

        resultados = await fetch(`/api/buscar${endpoint}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre
            })
            
        })
        .then(res => res.json())
        .then(res => {
            res.data.forEach(elemento => {
                const opcion = document.createElement("option");
                opcion.value = elemento.attributes.nombre;
                resultadosBusqueda.appendChild(opcion);
            });

            objetos = res.data;

        })

    }

    // Al presionar el botón el elemento lanza un evento a Cursos con el curso para que 
    // lo agregue a la base de datos
    async function agregar() {
        const objeto = objetos[0]; 

        dispatch('agregado', {
            objeto: objeto
        })
            
    }

</script>

<div class="bg-blue-400 w-fit mx-auto my-5 py-7 px-20 rounded-lg">

    <form action="">

        <div id="buscador" class="w-fit mx-auto">

            {#if endpoint === "Cursos"}
            
                <label for="busquedaCursos" class="mb-5 text-black">Agregar cursos: 
                    <input list="resultadosCursos"
                    id="busquedaCursos" 
                    placeholder="Buscar un curso..." 
                    on:input={handleInput} class="text-black"/>
                    <datalist id="resultadosCursos">
                        
                    </datalist>
                </label>

            {:else}
                
                <label for="busquedaRutas" class="mb-5 text-black">Agregar rutas: 
                    <input list="resultadosRutas"
                    id="busquedaRutas" 
                    placeholder="Buscar una ruta..." 
                    on:input={handleInput} class="text-black"/>
                    <datalist id="resultadosRutas">
                        
                    </datalist>
                </label>

            {/if}

            

            <button on:click={agregar} class="btn variant-filled-secondary block w-fit mx-auto ">
                {endpoint === "Cursos"? "Agregar curso" : "Agregar ruta"}
            </button>

        </div>

    </form>

</div>