import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST( {request} ){
    const {nombreCurso} = await request.json();
    const req = {
        endPoint: `cursos?filters[nombre][$containsi]=${nombreCurso}`,
        method: 'GET',
    }

    const result = await apiFetch( req );

    return new Response(JSON.stringify(result));
}