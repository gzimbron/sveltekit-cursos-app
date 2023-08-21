<!-- Este elemento es el buscador para asignarle un curso a un usuario -->
<!-- Funciona similar a el buscador de FormularioRuta -->

<script>
	import { createEventDispatcher } from "svelte";

    let resultados;
    let cursos = [];
    const dispatch = createEventDispatcher();

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

    // Al presionar el botón el elemento lanza un evento a Cursos con el curso para que 
    // lo agregue a la base de datos
    async function agregarCurso() {
        const curso = cursos[0];     

        dispatch('cursoAgregado', {
            curso: curso
        })
            
    }

</script>

<div class="bg-blue-400 w-fit mx-auto my-5 py-7 px-20 rounded-lg">

    <form action="">

        <div id="buscador" class="w-fit mx-auto">
            <label for="busquedaCursos" class="mb-5 text-black">Agregar cursos: 
                <input list="cursos"
                id="busquedaCursos" 
                placeholder="Buscar un curso..." 
                on:input={handleInput} class="text-black"/>
                <datalist id="cursos">
                    
                </datalist>
            </label>

            <button on:click={agregarCurso} class="btn variant-filled-secondary block w-fit mx-auto ">Agregar curso</button>

        </div>

    </form>

</div>