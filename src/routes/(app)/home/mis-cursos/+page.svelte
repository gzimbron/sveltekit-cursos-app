<script>
	import MisCursos from "$sections/CursosUsuario/MisCursos.svelte";
	import { onMount } from "svelte";
    import { userStore } from '$core/stores/user.store';

    //export let data;


</script>
<svelte:head>
    <title>Mis cursos</title>
</svelte:head>

<MisCursos idUsuario={$userStore.id}/>

<!--cursos={data.data}-->