<script>



</script>


<form method="POST" action="/cursos/agregarCurso" class="w-fit mx-auto">
    
    <label for="nombre">Nombre del curso: <input type="text" id="nombre" name="nombre" required/></label>

    <label for="descripcion">Descripción: <input type="text" id="descripcion" name="descripcion" required/></label>

    <input type="radio" id="activo" name="estado" value="1" checked>
    <label for="activo" class="estado">Activo</label>

    <input type="radio" id="inactivo" name="estado" value="0">
    <label for="inactivo" class="estado">Inactivo</label>

    <label for="imagen">URL de la imagen: <input type="text" id="imagen" name="imagenURL" required/></label>

    <label for="curso">URL del curso: <input type="text" id="curso" name="cursoURL" required/></label>

    <button class="btn block my-5 mx-auto bg-yellow-400 text-black">Agregar usuario</button>

</form>

<style lang="postcss">

    label{
            @apply my-5;
    }

    input[type="text"]{
        @apply text-black h-7 rounded-md w-full;
    }

    .estado{
        @apply inline mx-3;
    }

</style>