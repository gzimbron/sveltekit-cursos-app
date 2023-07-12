export default class Pelicula {
	/**
	 *
	 * @param {{id: number,title: string,releaseDate: Date,vote_average: number,vote_count: number,image: string }} data
	 */
	constructor({ id, title, releaseDate, vote_average, vote_count, image }) {
		this.id = id;
		this.title = title;
		this.vote_average = vote_average;
		this.vote_count = vote_count;
		this.image = image;
		this.releaseDate = releaseDate;
	}
}
