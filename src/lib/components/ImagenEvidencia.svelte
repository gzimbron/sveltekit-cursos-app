<script>
	import Loading from "$components/Loading.svelte";
	import Alerta from "$core/classes/Alerta";
    import { cursoId } from "$core/stores/curso.store";
	import { modalStore } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

    let id;
    let url;
    let loading = false;

    onMount(() => {
        if($cursoId){
            id = $cursoId
            consulta();
        } else {
            modalStore.close();
            Alerta.error("Error al mostrar la imagen");
        }
        
    })

    async function consulta(){

        loading = true;
        let response = await fetch('/api/obtenerURL', {
            method: 'POST',
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json();
        if(!response.error){
            url = response[0].attributes.verificacion
            loading = false;
            cursoId.set(null);
        } else {
            cursoId.set(null);
            modalStore.close();
            Alerta.error(response.message);
        }
        
    }

    function cerrar(){
        modalStore.close();
    }

</script>

{#if loading}
    <Loading />
{:else}
    <div>
        <button class="btn-icon variant-filled fixed top-4 right-4 z-50 font-bold shadow-xl" on:click={cerrar}>x</button>
        <img src={url} alt="Verificación" class="w-modal">
    </div>
{/if}