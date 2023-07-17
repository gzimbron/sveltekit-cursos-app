import { apiFetch } from "$core/functions/apiFetch";

/** @type {import("./$types").PageServerLoad} */
export async function load(){

    const req = {
        endPoint: "usuarios",
        method: "GET"
    }

    const {data} = await apiFetch(req);

    /**  @type {import('$core/entities/Usuario').default[]} */
    const usuarios = data.map((item) => ({
        id: item.id,
        nombre: item.attributes.nombre,
        email: item.attributes.email,
        proveedor: item.attributes.provider
    }))
    console.log(usuarios.length);

    return {usuarios};

}