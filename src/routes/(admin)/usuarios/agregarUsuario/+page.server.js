import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        const name = data.get('nombre');
        const email = data.get('email');
        const provider = data.get('provider');
        const password = data.get('password');

        console.log(data);
        const json = {
            "data":{
                "username": name,
                "email": email,
                "provider": provider,
                "password": password,
                "role": 1
            }
        }

        const req = {
            endPoint: "usuarios",
            method: "POST",
            body: json,
        }

        console.log(json);

        const result = await apiFetch(req);

        console.log(result);
    }
}