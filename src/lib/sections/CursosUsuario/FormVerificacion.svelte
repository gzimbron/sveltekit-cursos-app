<script>

    import { FileDropzone } from "@skeletonlabs/skeleton";

</script>

<div class="w-modal bg-inherit">
    <h3 class="w-fit mx-auto mb-5 text-lg">Debes subir una imagen como evidencia</h3>
    <FileDropzone name="imagen">
        <svelte:fragment slot="message">Click aquí o arrastra una imagen para subir</svelte:fragment>
    </FileDropzone>
</div>
