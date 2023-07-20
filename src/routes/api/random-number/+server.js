import { json } from '@sveltejs/kit';

/** @type {import("./$types").RequestHandler} */
export async function GET() {
	const randomNumber = Math.round(Math.random() * 100);

	//se espera X milisegundos para simular una llamada a una API
	await new Promise((resolve) => setTimeout(resolve, 15 * randomNumber));

	return json({ randomNumber });
}
