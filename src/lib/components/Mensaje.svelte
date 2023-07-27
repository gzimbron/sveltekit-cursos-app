<script>

    import {Toast, toastStore} from "@skeletonlabs/skeleton";

    export let texto;
    export let color;
    let background;

    if(color === "success"){
        background = "variant-filled-success";
    } else{
        background = "variant-filled-warning";
    }

    /**import("@skeletonlabs/skeleton").ToastSettings*/
    const t = {
        message: texto,
        background: background,
    };
    toastStore.trigger(t);

</script>