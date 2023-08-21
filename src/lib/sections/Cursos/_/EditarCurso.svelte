<script>

	import Loading from "$components/Loading.svelte";
	import Alerta from "$core/classes/Alerta";
    import { cursoId } from "$core/stores/curso.store";
	import { modalStore } from "@skeletonlabs/skeleton";


    let nombre, descripcion, activo, imagenURL, cursoURL, info;
    // Recibe el ID del curso del store
    let id = $cursoId;
    let loading = false;

    // Obtiene la información actual del curso para colocarla en el formulario
    async function getData(){

        // Set ID a null
        cursoId.set(null);

        let consulta = await fetch('/api/getInfoCurso', {
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
        imagenURL = info.attributes.imagenURL;
        cursoURL = info.attributes.cursoURL;
        
        }

    async function handleSubmit(){

        // Envía la información a la BD
        loading = true;
        let response = await fetch('/api/updateCurso', {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                activo: activo,
                imagenURL: imagenURL,
                cursoURL: cursoURL,
                id: id
            }),
            headers: { 'Content-Type': 'application/json'}
        })
        if(!response.ok){
            modalStore.close();
            Alerta.error("Hubo un error al actualizar la información del curso.")
            return;
        }else{
            response = await response.json();
            if(response.error){
                Alerta.error(response.message);
                return;
            }
        }
        location.reload();

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

            <label for="imagenURL">URL de la imagen: <input type="text" name="imagenURL" bind:value={imagenURL}></label>
            
            <label for="cursoURL">URL del curso: <input type="text" name="cursoURL" bind:value={cursoURL}></label>

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

</style>