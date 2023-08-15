<script lang="ts">
	import Cursos from "./_/Cursos.svelte";
    import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
	import EditarUsuario from "./_/EditarUsuario.svelte";
    import { userId } from "$core/stores/user.store";

    export let usuario;
    export let usuarioCursos = [];

    function abrirFormulario(){
        userId.set(usuario.id);
        const modalComponent: ModalComponent = {
            ref: EditarUsuario,
        };

        const modal: ModalSettings = {
            type: 'component',
            component: modalComponent
        }
        modalStore.trigger(modal);
    
    }

</script>

<main  class="my-10 mx-5">

    <div class="w-fit mx-auto">
        <h3>USUARIO</h3>
        <span class="text-5xl">{usuario.attributes.nombre}</span>
    
        <div class="flex justify-center gap-5 mt-5">
            <div>
                <h3 class="text-lg">Correo electrónico</h3>
                <span>{usuario.attributes.email}</span>
            </div>
    
            <div>
                <h3 class="text-lg">Proveedor</h3>
                <span>{usuario.attributes.provider}</span>
            </div>
    
        </div>

        <button class="w-full btn variant-filled-warning mt-5" on:click={abrirFormulario}>Editar usuario</button>
    </div>

    <Cursos usuarioCursos={usuarioCursos} idUsuario={usuario.id}/>

</main>


