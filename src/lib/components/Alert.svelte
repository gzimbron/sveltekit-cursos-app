<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from "svelte/transition"

    export let mensaje;

    const dispatch = createEventDispatcher();

    function aceptar(){
        dispatch('aceptar');
    }

    function cancelar(){
        dispatch('cancelar');
    }

</script>

<aside class="alert variant-filled-warning w-modal mx-auto my-5" 
transition:fade|local={{duration: 200}}>

    <div class="alert-message">
        <h3 class="h3">Alerta</h3>
        <p>{mensaje}</p>
    </div>

    <div class="alert-actions">
        <button on:click={aceptar}>Aceptar</button>
        <button on:click={cancelar}>Cancelar</button>
    </div>
</aside>