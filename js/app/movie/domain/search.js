define([], function() {

  function Search() {
    this.title = "";
    this.year = "";
    this.runtime = "";
    this.genres = "";
  }

  Search.prototype.setTitle = function (x) {
    this.title = x;
  }

  Search.prototype.getTitle = function () {
    return this.title;
  }

  Search.prototype.setYear = function (x) {
    this.year = x;
  }

  Search.prototype.getYear = function () {
    return this.year;
  }


  Search.prototype.setRuntime = function (x) {
    this.runtime = x;
  }

  Search.prototype.getRuntime = function () {
    return this.runtime;
  }


  Search.prototype.setGenres = function (x) {
    this.genres = x;
  }

  Search.prototype.getGenres = function () {
    return this.genres;
  }

  return Search;

});
