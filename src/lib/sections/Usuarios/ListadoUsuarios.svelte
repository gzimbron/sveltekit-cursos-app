<script>

	import FilaUsuario from "./_/FilaUsuario.svelte";

    /**  @type {import('$core/entities/Usuario').default[]} */
    export let usuarios = [];


</script>


<table>

    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre del usuario</th>
            <th>Email</th>
            <th>Proveedor</th>
            <th></th>
        </tr>

    </thead>

    <tbody>

            {#each usuarios as usuario}

                <FilaUsuario usuario={usuario} />

            {/each}

    </tbody>

</table>