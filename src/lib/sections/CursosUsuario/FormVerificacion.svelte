<script>

    import { modalStore } from "@skeletonlabs/skeleton";
    import { cursoId, imagenURL } from "$core/stores/curso.store";
	import Loading from "$components/Loading.svelte";
	import { onDestroy } from "svelte";
	import Alerta from "$core/classes/Alerta";

    let form;
    let loading = false;
    
    async function onChangeHandler(e){
      
        // Obtiene la ID del store
        const id = $cursoId;
        let url;
        let response;
        loading = true;
        try{
            // Postea la imagen a la BD
            response = await fetch('http://127.0.0.1:1337/api/upload', {
                method: 'post',
                body: new FormData(form)
            });
            response = await response.json();

            // Obtiene la URL de la imagen del objeto devuelto en la respuesta
            url = response[0].url;

            // Genera la URL completa de la imagen y hace post al endpoint que agrega la URL al objeto usuario-curso
            url = 'http://127.0.0.1:1337' + url;
        }
        catch {
            modalStore.close();
            Alerta.error("Hubo un error al subir la imagen.")
        }
        
        response = await fetch('/api/agregarEvidencia', {
            method: 'post',
            body: JSON.stringify({id: id, url: url})
        })
        response = await response.json();
        
        // Verifica que no haya error
        if(response.data){
            loading = false;
            // Setea la URL para poder acceder a ella en el componente UsuarioCurso
            imagenURL.set(url);
            modalStore.close();
            Alerta.success("Se agregó la evidencia exitosamente.")
        } else {
            modalStore.close();
            Alerta.error(response.message)
        }
        
    }

    function cerrarModal(){
        modalStore.close();
    }

    onDestroy(() => {
        cursoId.set(null);
    })

</script>

{#if loading}
    <Loading />
{:else}
    <div id="form" class="w-modal">

        <form action="" bind:this={form}>

            <div class="bg-surface-700 p-5">
                <h3 class="w-fit mx-auto mb-5 text-lg">Debes subir una imagen como evidencia</h3>
                <label for="files" class="border rounded-lg p-10 flex flex-col gap-3 justify-center items-center">
                    <span class="font-bold">Suelta aquí la imagen</span> 
                    o
                    <input type="file" name="files" id="files" on:change={onChangeHandler} />
                </label>
                    
                <button on:click={cerrarModal} class="btn variant-filled-primary block w-fit mx-auto mt-5">Agregar en otro momento</button>
            </div>

        </form>

    </div>
    
{/if}

<style lang="postcss">


</style>
    