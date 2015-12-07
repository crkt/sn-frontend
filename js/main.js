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
  

  var userLoggedIn = false;
  var currentUser = user.getUser();

  API.fetchGenres(function (genres) {
    genres.forEach(Search.prototype.addGenre, search);
  });

  user.onUserLoggedIn = function (loggedIn, r) {
    userLoggedIn = loggedIn;
    user.register.hide();
    user.login.hide();
    user.setUser(r);
    currentUser = user.getUser();
  }

  detail.onRatingCallback = function (id, rating) {
    if (userLoggedIn) {
      API.rate(id,rating,currentUser.id, 
               function (r) {
                 detail.updateRating(r);
               });      
    } else {
      console.log("You must be logged in to rate a movie");
    }
  }

  list.onMovieRated = function (id,rating) {
    if (userLoggedIn) {
      API.rate(id,rating,currentUser.id, function (r) {
        console.log("RATED MOVIE" + id + " " + r);
      });
    } else {
      console.log("You must be logged in to rate a movie");
    }
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
