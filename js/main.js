requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','movie/detail','api'],function(Movie, Search, Detail, API) 
{    
  

  var list = new Movie.List(document.querySelector("#moviez-list"));
  API.moviez.forEach(Movie.List.prototype.addMovie, list);

  var search = new Search(document.querySelector("#search-moviez"));

  var detail = new Detail(document.querySelector("#moviez-detail"));
  

  // Ehh, should be able to write in another way...
  list.onMovieSelected = function (movie) {
    detail.setMovie(movie);
  };

  search.onSearchResult(function (r) {
    r.forEach(Movie.List.prototype.addMovie, list);
  });

});
