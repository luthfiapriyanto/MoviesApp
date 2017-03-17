const controller = require('../controller/moviesController');

const configureRoutes = () => {
	return[
		{
			method: 'GET',
			path: '/movies',
			handler: controller.getMovieList
		},
		{
			method: 'GET',
			path: '/movies/{id}',
			handler: controller.getMovie
		},
		{
			method: 'POST',
			path: '/movies',
			handler: controller.createMovie
		},
		{
            method: 'DELETE',
            path: '/movies/{id}',
            handler: controller.deleteMovie
        },
        {
        	method: 'GET',
        	path: '/movies/search/{query}',
        	handler: controller.searchMovie
        }
	]
};

module.exports = configureRoutes;