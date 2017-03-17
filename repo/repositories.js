const { asPromise } = require('../utils');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieapp')
mongoose.Promise = Promise;

var Schema = mongoose.Schema;
var movieSchema = new Schema({
    _id: String,
    movieName: String,
    movieImage: String,
    rating: Number,
    longDesc: String
});
var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

module.exports = class MovieRepo {
    
    getMovieList(){
    	return Movie.find({});
    }

    getMovie(id){
        const movieFound = Movie.findById(id);
        return movieFound;
    }

    searchMovie(query){
        /// find all athletes that play tennis
        var query = Movie.find({ 'movieName': query }).exec();
        return query;
        return asPromise;

    }

    addMovie(newMovie){
        const movieToAdd = new Movie({
            _id: newMovie.id,
            movieName: newMovie.movieName,
            movieImage: newMovie.movieImage,
            rating: newMovie.rating,
            longDesc: newMovie.longDesc
        });

        movieToAdd.save(function(err){
            if ( err ) throw err;
            console.log("Saved Successfully");
        });
        return asPromise();
    }

    removeMovie(id){
        Movie.remove({_id:{$eq: id}}).exec();
        return asPromise();
    }
};