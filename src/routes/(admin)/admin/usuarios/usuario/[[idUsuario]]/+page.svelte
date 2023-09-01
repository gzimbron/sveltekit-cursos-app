<script>
	import InfoUsuario from "$sections/Usuarios/InfoUsuario/InfoUsuario.svelte";


    export let data;

</script>

<svelte:head>
    <title>Usuario: {data.usuario.attributes.nombre}</title>
</svelte:head>

<InfoUsuario usuario={data.usuario} usuarioCursos={data.usuarioCursos} usuarioRutas={data.usuarioRutas}/>
