<script>
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}
					>Inicio</AppRailAnchor
				>
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
