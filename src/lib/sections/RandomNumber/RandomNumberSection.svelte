<script>
	import Loading from '$components/Loading.svelte';
	import Alerta from '$core/classes/Alerta';
	import { apiFetch } from '$core/functions/apiFetch';

	let numero;
	let loading;

	const getRandomNumber = async () => {
		try {
			loading = true;
			numero = null;
			const { randomNumber } = await apiFetch({
				endPoint: 'random-number',
				method: 'GET'
			});
			numero = randomNumber;
		} catch (error) {
			console.error(error);
			Alerta.error('Error al obtener el número aleatorio');
		} finally {
			loading = false;
		}
	};
</script>

<section>
	<div class="contenedor">
		<h1 class="h1">Random Number</h1>
		<p class="code">src/lib/sections/RandomNumber/RandomNumberSection.svelte</p>
		<p>Esta sección demuestra como hacer un fetch dentro de un componente a una api.</p>

		<div class="text-center">
			<button class="btn variant-filled-warning" on:click={getRandomNumber}>Obtener número</button>
		</div>

		{#if loading}
			<div class="text-center">
				<Loading size={24} />
			</div>
		{:else if numero}
			<div class="text-center">
				<p class="text-2xl">{numero}</p>
			</div>
		{/if}
	</div>
</section>

<style lang="postcss">
	section {
		@apply container h-full mx-auto flex justify-center items-center;
	}

	.contenedor {
		@apply w-full md:w-96 space-y-5 mx-10;
	}
</style>
