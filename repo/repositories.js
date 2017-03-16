//const uuidV1 = require('uuid/v1');

const asPromise = (error, result) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }, 1);
    });
};

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieapp')
mongoose.Promise = Promise;

var Schema = mongoose.Schema;
var movieSchema = new Schema({
    id: String,
    movieName: String,
    movieImage: String,
    rating: Number
});
var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

module.exports = class MovieRepo {
    
    getMovieList(){
    	return Movie.find({});
    }

    getMovie(id){
        const productFound = this.product.find(product => product._id == id);
        return asPromise(null, productFound)
    }

    addMovie(newMovie){
        const movieToAdd = new Movie({
            id: newMovie.id,
            movieName: newMovie.movieName,
            movieImage: newMovie.movieImage,
            rating: newMovie.rating
        });

        movieToAdd.save(function(err){
            if ( err ) throw err;
            console.log("Saved Successfully");
        });
        return asPromise(null, {id});
    }

    removeMovie(id){
        Movie.remove({rating:{$eq: id}}).exec();
        return asPromise();
    }
};