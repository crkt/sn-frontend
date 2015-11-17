define([], function() {
  
  function SearchModel () {
    this.title = undefined; // text
    this.runtime = undefined; // number
    this.year = undefined; // number
    this.genres = undefined; // array
  }

  SearchModel.prototype.setTitle = function (x) {
    if (x === "") {
      this.title = undefined;
    } else {
      this.title = x;
    }
  }

  SearchModel.prototype.getTitle = function () {
    return this.title;
  }
  
  SearchModel.prototype.setRuntime = function (x) {
    if (x === 0 || x === "") {
      this.runtime = undefined;
    } else {
      this.runtime = x;
    }
  }

  SearchModel.prototype.getRuntime = function () {
    return this.runtime;
  }

  SearchModel.prototype.setYear = function (x) {
    if (x === 0 || x === "") {
      this.year = undefined;
    } else {
      this.year = x;
    }
  }

  SearchModel.prototype.getYear = function () {
    return this.year;
  }

  SearchModel.prototype.setGenres = function (x) {
    if (x.length == 0 || x == "") {
      this.genres = undefined;
    } else {
      this.genres = x;
    }
  }

  SearchModel.prototype.getGenres = function () {
    return this.genres;
  }
  
  return SearchModel;

});
