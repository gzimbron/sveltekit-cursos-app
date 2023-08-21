<!-- Formulario de inicio de sesión -->

<script>
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Alerta from '$core/classes/Alerta';

    let loading = false;

    async function formSubmitted(){

        return async ({ result }) => {

            loading = true;
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
                loading = false;
            }
        };
    }

</script>


<div class="border border-black rounded-lg w-modal-slim p-5 bg-white mx-auto">

    <form action="/" method="POST" use:enhance={formSubmitted}>

        <label for="email" class="my-5"><input type="email" placeholder="Email" name="email" class="text-black rounded-md w-full"></label>
        <button type="submit"  class="btn block my-5 mx-auto bg-yellow-400 text-black" disabled={loading}>Iniciar sesión</button>

    </form>

</div>