<script>

    import { AppRail, AppRailTile, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import { page} from '$app/stores';

</script>


<AppShell>
	<!--<svelte:fragment slot="header">Header</svelte:fragment>-->
	<svelte:fragment slot="sidebarLeft">
        <AppRail>
            <svelte:fragment slot="lead">
                <AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Inicio</AppRailAnchor>
            </svelte:fragment>
            <!-- --- -->
            <AppRailAnchor href="/usuarios" selected={$page.url.pathname === '/usuarios'}>
                <svelte:fragment slot="lead">Usuarios</svelte:fragment>
            </AppRailAnchor>
            <AppRailAnchor href="/cursos" selected={$page.url.pathname === '/cursos'}>
                <svelte:fragment slot="lead">Cursos</svelte:fragment>
            </AppRailAnchor>
            <AppRailAnchor href="/rutas" selected={$page.url.pathname === '/rutas'}>
                <svelte:fragment slot="lead">Rutas</svelte:fragment>
            </AppRailAnchor>
            <!-- --- -->
            <!--<svelte:fragment slot="trail">
                <AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
            </svelte:fragment> -->
        
        </AppRail>
    </svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (footer) -->
</AppShell>

<!--<AppRail>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/" >(icon)</AppRailAnchor>
	</svelte:fragment>
	
	<AppRailAnchor href="/usuarios">
        <svelte:fragment slot="lead">Usuarios</svelte:fragment>
    </AppRailAnchor>
	<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 2</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		<span>Tile 3</span>
	</AppRailTile>
	
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
	</svelte:fragment>

</AppRail>-->

<style lang="postcss">

    .botones{
        @apply mt-9
    }
    
</style>