define([], function() {
  
  function SearchModel () {
    this.title = undefined; // text
    this.runtime = undefined; // number
    this.year = undefined; // number
    this.genres = undefined; // array
  }

  SearchModel.prototype.setTitle = function (x) {
    this.title = x;
  }

  SearchModel.prototype.getTitle = function () {
    return this.title;
  }
  
  SearchModel.prototype.validateTitle = function () {
    return (this.search === "" || 
            this.search === undefined);
  }

  SearchModel.prototype.setRuntime = function (x) {
    this.runtime = x;
  }

  SearchModel.prototype.getRuntime = function () {
    return this.runtime;
  }

  SearchModel.prototype.validateRuntime = function () {
    return (this.runtime === 0 ||
            this.runtime === undefined);
  }

  SearchModel.prototype.setYear = function (x) {
    this.year = x;
  }

  SearchModel.prototype.getYear = function () {
    return this.year;
  }

  SearchModel.prototype.validateYear = function () {
    return (this.year === 0 ||
            this.year === undefined);
  }


  SearchModel.prototype.setGenres = function (x) {
      this.genres = x;
  }

  SearchModel.prototype.getGenres = function () {
    return this.genres;
  }

  SearchModel.prototype.validateGenres = function () {
    return (this.genres.length === 0 ||
            this.genres === undefined);
  }

  return SearchModel;

});
