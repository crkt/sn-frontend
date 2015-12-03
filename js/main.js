requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','api'],function(Movie, Search, API) 
{    
  
  var list = new Movie.List(document.querySelector("#moviez-list"));
  API.moviez.forEach(Movie.List.prototype.addMovie, list);

  var search = new Search(document.querySelector("#search-moviez"));
  
});
