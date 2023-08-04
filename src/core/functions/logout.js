import { goto } from "$app/navigation";
import { userStore } from "$core/stores/user.store";

export const logout = async () => {
    userStore.set(null);
    sessionStorage.removeItem("iduser");
    goto("/");
    location.reload();
}