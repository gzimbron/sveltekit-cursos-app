import { PUBLIC_LOCAL_API_URL } from '$env/static/public';

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch }) {
	const response = await fetch(`${PUBLIC_LOCAL_API_URL}usuarios`);
	let data = await response.json();
	data = data.data;

	/**  @type {import('$core/entities/Usuario').default[]} */
	const usuarios = data.map((usuario) => ({
		id: usuario.id,
		name: usuario.attributes.nombre,
		email: usuario.attributes.email,
		provider: usuario.attributes.provider
	}));

	return { usuarios };
}
