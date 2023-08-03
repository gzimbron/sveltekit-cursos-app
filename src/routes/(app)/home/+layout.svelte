<script>
	import { goto } from "$app/navigation";
	import { getUserLogin } from "$core/functions/getUserLogin";
	import { userStore } from "$core/stores/user.store";
    import Loading from '$components/Loading.svelte';
	import { onMount } from "svelte";

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

{#if loading}
	<section class="h-screen w-screen flex items-center">
		<Loading />
	</section>
{:else}

    <slot />
{/if}