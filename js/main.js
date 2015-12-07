requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','movie/detail','user/user','api'],function(Movie, Search, Detail, User, API) 
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

  var user = new User();
  document.querySelector("#user").appendChild(user.register.dom);
  document.querySelector("#user").appendChild(user.login.dom);
  document.querySelector("#user").appendChild(user.profile.dom);
  

  API.fetchGenres(function (genres) {
    genres.forEach(Search.prototype.addGenre, search);
  });

  //API.moviez.forEach(Movie.List.prototype.addMovie, list);

  user.onUserLoggedIn = function (loggedIn, r) {
    user.register.hide();
    user.login.hide();
    user.setUser(r.username);
    
  }

  list.onMovieSelected = function (movie) {
    detail.setMovie(movie);
  };

  search.searchResultCallback = function (r) {
    list.clear();
    r.forEach(Movie.List.prototype.addMovie, list);
  };

  search.randomResultCallback = function (movie) {
    detail.setMovie(movie);
  }


});
