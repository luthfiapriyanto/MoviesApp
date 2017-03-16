const toMovie = (presistedMovie) =>{
	if(presistedMovie){
		return{
			id: presistedMovie.id,
			movieName: presistedMovie.movieName,
			movieImage: presistedMovie.movieImage,
			rating: presistedMovie.rating

		};
	}else{
		throw {
            message: 'error', 
        }
	}
};
const toMovieDetails = (presistedMovie) =>{
	if(presistedMovie){
		return{
			id: presistedMovie.id,
			movieName: presistedMovie.movieName,
			movieImage: presistedMovie.movieImage,
			rating: presistedMovie.rating,
			longDesc: presistedMovie.longDesc
		};
	}else{
		throw {
            message: 'error',        
        }
	}
};

const createMovie = (movie, save) => {
    const newMovie = {
    	id: movie.id,
        movieName: movie.movieName,
        movieImage: movie.movieImage,
        rating: movie.rating
    };
    return save(newMovie)
};

const getMovieList = (load) =>{
    return load().then(presistedMovie => presistedMovie.map(toMovie))
}

const getMovie = (id, loadById) =>{
	return loadById(id).then(toMovieDetails);
}

const removeMovie = (id, remove) => {
    return remove(id)
};

module.exports = {
	getMovieList,
	getMovie,
	createMovie,
	removeMovie
}