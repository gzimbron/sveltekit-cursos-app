<script>
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Alerta from '$core/classes/Alerta';

    async function formSubmitted(){
        return async ({ result }) => {

            if(result.type === "success"){
                sessionStorage.setItem("iduser", result.data.id);
                if(result.data.rol === "admin"){
                    goto("admin");
                } else {
                    goto("home/mis-cursos")
                }

            }else{
                const boton = document.querySelector("button");
                boton.disabled = false;
                Alerta.error(result.error.message, {
                    title: "Error al iniciar sesión"
                });
            }
        };
    }

    function deshabilitarBoton(e){
        e.target.disabled = true;
    }

    function alerta(){
        Alerta.customQuestion("Seguro?")
        .then((result) => {
            console.log(result);
        })
    }

</script>


<div class="border border-black rounded-lg w-modal-slim p-5 bg-white mx-auto">

    <form action="/" method="POST" use:enhance={formSubmitted}>

        <label for="email" class="my-5"><input type="email" placeholder="Email" name="email" class="text-black rounded-md w-full"></label>
        <button type="submit"  class="btn block my-5 mx-auto bg-yellow-400 text-black">Iniciar sesión</button>
        <!--on:click={deshabilitarBoton}-->
    </form>

    <button on:click={alerta} class="text-black">Alerta</button>

</div>