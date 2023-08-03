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
                Alerta.error(result.error.message, {
                    title: "Error al iniciar sesión"
                });
            }
        };
    }
</script>


<div>

    <form action="/" method="POST" use:enhance={formSubmitted}>

        <label for="email"><input type="email" placeholder="Email" name="email"></label>
        <button>Iniciar sesión</button>

    </form>


</div>