define([], function() {

  /** 
  The movie model
  It's kind of a class. It uses the prototype chain in the javascript specification
  **/
  function Movie() {
    this.title = "";
    this.year = "";
    this.runtime = 0;
    this.genre = [];
  }
  
  /**
     Setters and Getters for the defined variables.
     (Might add validation later...)
   **/

  Movie.prototype.setTitle = function (x) {
    this.title = x;
  }

  Movie.prototype.getTitle = function () {
    return this.title;
  }

  Movie.prototype.setYear = function (x) {
    this.year = x;
  }

  Movie.prototype.getYear = function () {
    return this.year;
  }

  Movie.prototype.setRuntime = function (x) {
    this.runtime = x;
  }

  Movie.prototype.getRuntime = function () {
    return this.runtime;
  }

  Movie.prototype.setGenre = function (x) {
    this.genre = x;
  }
  
  Movie.prototype.getGenre = function () {
    return this.genre;
  }

  // Return the Movie prototype in requirejs
  return Movie;

});
