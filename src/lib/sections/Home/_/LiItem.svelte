<script>
	export let showEmoji = false;
</script>

<li>
	{#if showEmoji}
		<span class="absolute left-2">🌎</span>
		<span class="absolute right-2">🌎</span>
	{/if}
	<span>
		<slot />
	</span>
</li>

<style lang="postcss">
	li {
		@apply relative py-2 my-2 text-3xl text-center bg-slate-900 text-slate-50;
		@apply hover:text-slate-900 hover:bg-slate-50;
	}
</style>
