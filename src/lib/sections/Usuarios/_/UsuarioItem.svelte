<script>

    export let usuario;

</script>



<tr class="">
    
    <td>{usuario.id}</td>
    <td>{usuario.name}</td>
    <td>{usuario.email}</td>
    <td>{usuario.provider}</td>
    <td><button class="bg-red-700 p-1">Eliminar</button></td>

</tr>

<style lang="postcss">

    td{
        @apply text-center py-3
    }

</style>