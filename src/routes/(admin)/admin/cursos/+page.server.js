import { apiFetch } from "$core/functions/apiFetch";

/** @type {import("./$types").PageServerLoad} */
export async function load(){

    const response = await apiFetch({endPoint: 'cursos', method: 'GET'})
    let data = response.data;

    /**  @type {import('$core/entities/Curso').default[]} */
    const cursos = data.map((curso) => ({
        id: curso.id,
        name: curso.attributes.nombre,
        descripcion: curso.attributes.descripcion,
        activo: curso.attributes.activo,
        imagenURL: curso.attributes.imagenURL,
        cursoURL: curso.attributes.cursoURL
    })); 

    return {cursos};
}