import { PUBLIC_LOCAL_API_URL } from '$env/static/public';

const handleError = async (response) => {
	if (!response.ok) {
		const bodyError = await response.json();

		throw Error(JSON.stringify(bodyError));
	}
	return response;
};

/**
 *
 * @param {{ endPoint: string;method: string;body?: object;anonymous?: boolean; api_url?: string}} req
 * @returns
 */
export const apiFetch = async (req) => {
	const { endPoint, method, body, anonymous = false, api_url = PUBLIC_LOCAL_API_URL } = req;

	const urlApi = api_url + endPoint;

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	//Hay métodos que no requieren token, como la autenticación de usuario
	if (!anonymous) {
		//const token = obtener token
		//headers.append('Authorization', 'Bearer ' + token);
	}

	let bodyString = null;
	if (body) bodyString = JSON.stringify(body);

	const request = new Request(urlApi, { method: method, headers: headers, body: bodyString });

	let result = [];
	result = await fetch(request)
		.then(handleError)
		.then((response) => response.json());

	return result;
};
