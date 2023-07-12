<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	/**
	 * Página actual, por defecto es 1
	 * @type {number}
	 */
	export let page = 1;

	/**
	 * Número total de páginas
	 * @type {number}
	 */
	export let total;

	let onPageChange = (toPage) => {
		dispatch('pageChange', toPage);
	};
</script>

<section>
	<div class="paginator">
		<button
			class="btn variant-filled-tertiary"
			disabled={page === 1}
			on:click={() => onPageChange(page - 1)}
		>
			Anterior
		</button>

		<span class="text-2xl font-bold">{page}</span>

		<button
			class="btn variant-filled-tertiary"
			disabled={page === total}
			on:click={() => onPageChange(page + 1)}
		>
			Siguiente
		</button>
	</div>
</section>

<style lang="postcss">
	.paginator {
		@apply flex justify-end gap-4 items-center my-4;
	}
</style>
