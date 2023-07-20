import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        const name = data.get('nombre');
        const descripcion = data.get('descripcion');
        const activo = data.get('estado');
        const imagenURL = data.get('imagenURL');
        const cursoURL = data.get('cursoURL');

        console.log(data);
        const json = {
            "data":{
                "nombre": name,
                "descripcion": descripcion,
                "activo": activo,
                "imagenURL": imagenURL,
                "cursoURL": cursoURL
            }
        }

        const req = {
            endPoint: "cursos",
            method: "POST",
            body: json,
        }

        const result = await apiFetch(req);

    }
}