<script>



</script>


<form method="POST" action="/usuarios/agregarUsuario" class="w-fit mx-auto">
    
    <label for="nombre">Nombre del usuario: <input type="text" id="nombre" name="nombre" required/></label>

    <label for="email">Correo electrónico: <input type="email" id="email" name="email" required/></label>

    <label for="provider">Provider: <input type="text" id="provider" name="provider" required/></label>

    <label for="password">Contraseña: <input type="text" id="password" name="password" required/></label>

    <button class="btn block my-5 mx-auto bg-yellow-400 text-black">Agregar usuario</button>

</form>

<style lang="postcss">

    label{
        @apply my-5;
    }

    input{
        @apply text-black h-7 rounded-md w-full;
    }

</style>