<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '$components/Loading.svelte';
	import { getUserLogin } from '$core/functions/getUserLogin';
	import { userStore } from '$core/stores/user.store';
	import { AppRail, AppRailAnchor, AppShell, Modal } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { logout } from '$core/functions/logout';

	let loading = true;

	const verificarLogin = async () => {
		try {
			await getUserLogin();
			if(!$userStore){
				return goto("/")
			}

			if (!$userStore.admin) {
				return goto('/home/mis-cursos');
			}
			loading = false;
		} catch (error) {
			return goto("/");
		}
	};

	onMount(verificarLogin);
</script>

<Modal />

{#if loading}
	<section class="h-screen w-screen flex items-center">
		<Loading />
	</section>
{:else}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
			<AppRail>
					<AppRailAnchor href="" on:click={logout}>
						<svelte:fragment slot="lead">Cerrar sesión</svelte:fragment>
					</AppRailAnchor>
				<svelte:fragment slot="lead">
					<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
						Inicio
					</AppRailAnchor>
				</svelte:fragment>
				<!-- --- -->
				<AppRailAnchor href="/admin/usuarios" selected={$page.url.pathname === '/admin/usuarios'}>
					<svelte:fragment slot="lead">Usuarios</svelte:fragment>
				</AppRailAnchor>
				<AppRailAnchor href="/admin/cursos" selected={$page.url.pathname === '/admin/cursos'}>
					<svelte:fragment slot="lead">Cursos</svelte:fragment>
				</AppRailAnchor>
				<AppRailAnchor href="/admin/rutas" selected={$page.url.pathname === '/admin/rutas'}>
					<svelte:fragment slot="lead">Rutas</svelte:fragment>
				</AppRailAnchor>
			</AppRail>
		</svelte:fragment>

		<slot />
	</AppShell>
{/if}
