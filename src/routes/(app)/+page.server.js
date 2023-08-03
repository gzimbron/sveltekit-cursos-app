import { apiFetch } from '$core/functions/apiFetch';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");

        if(!email){
            throw error(401, "Debe ingresar un email.");
        }

        let usuario = await apiFetch({
            endPoint: `usuarios?filters[email][$eq]=${email}`,
            method: "GET",
        });

        if(usuario.data.length){
            usuario = usuario.data[0];
            if(usuario.attributes.admin){
                return { id: usuario.id, rol: "admin" }
            } else {
                return { id: usuario.id, rol: "user" }
            }
            
        } else {
            throw error(401, "El usuario ingresado no existe.")
        }


    }
}