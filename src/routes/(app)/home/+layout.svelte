<script>
	import { goto } from "$app/navigation";
	import { getUserLogin } from "$core/functions/getUserLogin";
	import { userStore } from "$core/stores/user.store";
    import Loading from '$components/Loading.svelte';
	import { onMount } from "svelte";
	import { logout } from "$core/functions/logout";
	import { Modal } from "@skeletonlabs/skeleton";

    let loading = true;

	const verificarLogin = async () => {
		try {
			await getUserLogin();
			if(!$userStore){
				return goto("/")
			}

			loading = false;
		} catch (error) {
			console.log(error);
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
	<button class="mt-3 ml-3" on:click={logout}>Cerrar sesión</button>

    <slot />
{/if}