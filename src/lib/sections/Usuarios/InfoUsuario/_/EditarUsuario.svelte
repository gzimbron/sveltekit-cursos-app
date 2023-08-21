<script>
	import Loading from "$components/Loading.svelte";
	import Alerta from "$core/classes/Alerta";
    import { userId } from "$core/stores/user.store";
	import { modalStore } from "@skeletonlabs/skeleton";


    let nombre, email, provider, admin, info;
    // Recibe el ID del store
    let id = $userId;
    let loading = false;

    async function getData(){

        const consulta = await fetch('/api/getInfoUsuario', {
            method: 'POST',
            body: JSON.stringify({id: id}),
            headers: {'Content-Type': 'application/json'},
        })
        if(!consulta.ok){
            throw new Error("Error al obtener la información del usuario.")
        }
        info = await consulta.json();

        info = info.data[0]; 

        nombre = info.attributes.nombre;
        email = info.attributes.email;
        provider = info.attributes.provider;
        admin = info.attributes.admin;

        // Set ID a null
        userId.set(null);
        
        }

    async function handleSubmit(){

        loading = true;
        let response = await fetch('/api/updateUsuario', {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                provider: provider,
                admin: admin,
                id: id,
            }),
            headers: { 'Content-Type': 'application/json'}
        })
        if(!response.ok){
            modalStore.close();
            Alerta.error("Hubo un error al actualizar la información del usuario.")
            return;
        } else{
            response = await response.json();
            if(response.error){
                Alerta.error(response.message);
                loading = false;
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

            <label for="email">Email: <input type="email" name="email" bind:value={email}></label>

            <label for="provider">Proveedor: <input type="text" name="provider" bind:value={provider}></label>

            <label for="admin">Administrador: <input type="checkbox" name="admin" bind:checked={admin}></label>

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

    input[type="email"]{
        @apply text-black h-7 rounded-md w-full;
    }

</style>