import { apiFetch } from '$core/functions/apiFetch';

/** @type {import("./$types").PageServerLoad} */
export async function load() {
	const response = await apiFetch({ 
        endPoint: `usuario-cursos?filters[idUsuario][$eq]=2&populate=*`,
        method: 'GET' });
	let data = response.data;


	return { data };
}