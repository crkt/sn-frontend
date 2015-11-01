define([], function() {

  function Search() {
    this.genres = "";
  }

  Search.prototype.setGenres = function (x) {
    this.genres = x;
  }

  Search.prototype.getGenres = function () {
    return this.genres;
  }

  return Search;

});
