<script>



</script>


<form method="POST" action="/usuarios/agregarUsuario" class="w-fit mx-auto">
    
    <label for="nombre">Nombre del usuario: <input type="text" id="nombre" name="nombre" class="text-black"/></label>

    <label for="email">Correo electrónico: <input type="email" id="email" name="email" class="text-black"/></label>

    <label for="provider">Provider: <input type="text" id="provider" name="provider" class="text-black"/></label>

    <label for="password">Contraseña: <input type="text" id="password" name="password" class="text-black"/></label>

    <button class="btn block my-5 mx-auto bg-yellow-400 text-black">Agregar usuario</button>

</form>

<style lang="postcss">

    label{
        @apply my-2;
    }

</style>