const MovieRepository = require('../repo/repositories');
const movieService = require('../services/movieService');
const movieRepo = new MovieRepository();
const Boom = require('Boom');

const getMovieList = (request, reply)=>{
	movieService
		.getMovieList(movieRepo.getMovieList)
		.then(movie => reply(movie))
};

const searchMovie = (request, reply)=>{
	const query = request.params.query;
	movieService
		.searchMovie(query, movieRepo.getMovieList)
		.then(movie => reply(movie)) 
		.catch(error => reply(Boom.badImplementation('Failed to search movie', error)));

}

const getMovie = (request, reply)=>{
	const id = request.params.id;
	movieService
		.getMovie(id, movieRepo.getMovie)
		.then(movie => reply(movie)) 
		.catch(error => reply(Boom.badImplementation('Failed to get movie', error)));

};

const createMovie = (request, reply) => {
    const movie = request.payload;
    movieService
        .createMovie(movie, movieRepo.addMovie)
        .then(movie => reply(movie).code(201))
        .catch(error => reply(Boom.badImplementation('Error when created', error)));
};

const deleteMovie = (request, reply) => {
    const id = request.params.id;
    movieService
        .removeMovie(id, movieRepo.removeMovie)
        .then(reply(id).code(204))
        .catch(error => {
            if(error.code === 'NoSuchContact'){
                return reply(Boom.notFound('Contact not found', error));
            }else{
                return reply(Boom.badImplementation('Failed to delete contact', error));
            }
        });
};

module.exports = {
	getMovieList,
	getMovie,
	createMovie,
	deleteMovie,
	searchMovie
};