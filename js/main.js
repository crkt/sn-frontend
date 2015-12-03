requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','movie/detail','api'],function(Movie, Search, Detail, API) 
{    
  
  /***
      Find a way to handle event management.
      In a neat manner...
   ***/

  var list = new Movie.List();
  document.querySelector("#moviez-list").appendChild(list.view.dom);

  var search = new Search();
  document.querySelector("#search-moviez").appendChild(search.view.dom);
  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);
  

  API.moviez.forEach(Movie.List.prototype.addMovie, list);

  // Ehh, should be able to write in another way...
  list.onMovieSelected = function (movie) {
    detail.setMovie(movie);
  };

  // Black magic vodoo..?
  search.onSearchResult(function (r) {
    r.forEach(Movie.List.prototype.addMovie, list);
  });

});
