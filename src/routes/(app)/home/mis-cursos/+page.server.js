import { apiFetch } from '$core/functions/apiFetch';
import { USER_ID } from '$env/static/private';
import { userStore } from '$core/stores/user.store';

/** @type {import("./$types").PageServerLoad} */
export async function load() {

	const response = await apiFetch({
		
		endPoint: `usuario-cursos?filters[idUsuario][$eq]=${USER_ID}&populate=*`,
		method: 'GET'
	});
	let data = response.data;

	return { data };
}
