<script>

	import { goto } from "$app/navigation";

</script>


<div class="flex justify-center space-x-4 botones">
    <a class="btn variant-filled-tertiary" href="/usuarios">Usuarios</a>
    <button class="btn variant-filled-tertiary" on:click={() => {goto("././cursos")}}>Cursos</button>
    <button class="btn variant-filled-tertiary" on:click={() => {goto("././rutas")}}>Rutas</button>
</div>

<slot />

<style lang="postcss">

    .botones{
        @apply mt-9
    }
    
</style>