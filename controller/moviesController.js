const MovieRepository = require('../repo/repositories');
const movieService = require('../services/movieService');
const movieRepo = new MovieRepository();

const getMovieList = (request, reply)=>{
	movieService
		.getMovieList(movieRepo.getMovieList)
		.then(movie => reply(movie))
};

const getMovie = (request, reply)=>{
	const id = request.params.id;
	movieService
		.getMovie(id, movieRepo.getMovie)
		.then(movie => reply(movie)) 
};

const createMovie = (request, reply) => {
    const movie = request.payload;
    movieService
        .createMovie(movie, movieRepo.addMovie)
        .then(movie => reply(movie).code(201))
};

const deleteMovie = (request, reply) => {
    const id = request.params.id;
    movieService
        .removeMovie(id, movieRepo.removeMovie)
        .then(reply().code(204))
        .catch(error => {
            if(error.code === 'NoSuchContact'){
                //return reply(Boom.notFound('Contact not found', error));
            }else{
                //return reply(Boom.badImplementation('Failed to delete contact', error));
            }
        });
};

module.exports = {
	getMovieList,
	getMovie,
	createMovie,
	deleteMovie
};