<script lang="ts">
	import MisCursos from "$sections/CursosUsuario/MisCursos.svelte";
    import { userStore } from '$core/stores/user.store';

</script>

<svelte:head>
    <title>Mis cursos</title>
</svelte:head>

<MisCursos idUsuario={$userStore.id}/>
