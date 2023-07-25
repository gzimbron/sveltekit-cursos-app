<script>
	import LiItem from './_/LiItem.svelte';

	const listaDeItems = [
		{
			text: 'Hola',
			emoji: false
		},
		{
			text: 'Mundo',
			emoji: true
		},
		{
			text: '<i>SvelteKit</i>',
			emoji: false
		}
	];
</script>

<section>
	<div class="space-y-5">
		<h1 class="h1">Página de Inicio</h1>
		<p>Esta es la sección inicial de demostración.</p>
		<p class="code">src/lib/sections/Home/HomeSection.svelte</p>
		<ul>
			{#each listaDeItems as item}
				<LiItem showEmoji={item.emoji}>{@html item.text}</LiItem>
			{/each}
		</ul>

		<div class="text-right">
			<a href="/admin" class="btn variant-filled-primary">Sección administrador</a>
			<a href="/home/mis-cursos" class="btn variant-filled-primary">Sección usuario</a>
		</div>
	</div>
</section>

<style lang="postcss">
	section {
		@apply container h-full mx-auto flex justify-center items-center;
	}
</style>
