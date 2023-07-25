<script>
	import MisCursos from "$sections/CursosUsuario/MisCursos.svelte";
	import { onMount } from "svelte";

    export let data;

    onMount(() => {console.log(data.data)});

</script>
<svelte:head>
    <title>Mis cursos</title>
</svelte:head>

<MisCursos cursos={data.data}/>