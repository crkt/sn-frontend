define([], function() {
  
  function SearchModel () {
    this.title = "";
    this.runtime = 0;
    this.year = 0;
    this.genres = [];
  }

  SearchModel.prototype.setTitle = function (x) {
    this.title = x;
  }
  SearchModel.prototype.getTitle = function () {
    return this.title;
  }

  SearchModel.prototype.setRuntime = function (x) {
    this.runtime = x;
  }
  SearchModel.prototype.getRuntime = function () {
    return this.runtime;
  }

  SearchModel.prototype.setYear = function (x) {
    this.year = x;
  }
  SearchModel.prototype.getYear = function () {
    return this.year;
  }

  SearchModel.prototype.setGenres = function (x) {
    this.genres = x.split(",");
  }
  SearchModel.prototype.getGenres = function () {
    return this.genres;
  }

  return SearchModel;

});
