<script>
	import Login from './../../lib/sections/Home/Login.svelte';
	import HomeSection from '$sections/Home/HomeSection.svelte';
</script>

<svelte:head>
	<title>¡Página de inicio!</title>
</svelte:head>

<!-- <HomeSection /> -->

<h1 class="my-10 mx-auto w-fit text-4xl">Administrador de cursos</h1>
<h3 class="mb-5 mx-auto w-fit">Inicie sesión para acceder</h3>

<Login />
