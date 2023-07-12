import { MOVIES_API_KEY, MOVIES_API_URL } from '$env/static/private';

/** @type {import("./$types").PageServerLoad} */
export async function load({ params, fetch }) {
	const { page = '1' } = params;

	const res = await fetch(`${MOVIES_API_URL}/movie/popular?api_key=${MOVIES_API_KEY}&page=${page}`);

	const { results, total_pages, total_results } = await res.json();

	/**  @type {import('$core/entities/Pelicula').default[]} */
	const peliculas = results.map((item) => ({
		id: item.id,
		title: item.title,
		vote_average: item.vote_average,
		vote_count: item.vote_count,
		releaseDate: new Date(item.release_date),
		image: `https://image.tmdb.org/t/p/w500${item.poster_path}`
	}));

	return {
		page: parseInt(page),
		peliculas,
		total_pages,
		total_results
	};
}
