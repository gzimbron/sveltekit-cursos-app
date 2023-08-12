<script>
	import Cursos from "./_/Cursos.svelte";

    export let usuario;
    export let usuarioCursos = [];

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
    </div>

    <Cursos usuarioCursos={usuarioCursos} idUsuario={usuario.id}/>

</main>


