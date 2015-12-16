requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','movie/detail', 'movie/sort', 'user/user','api','header'],function(List, Search, Detail, Sort, User, API, Header) 
{    

  var header = new Header();
  document.querySelector("header").appendChild(header.view.dom);

  /** Create the views and add them  to the html document **/
  var list = new List();
  document.querySelector("#moviez-list").appendChild(list.view.dom);

  var sort = new Sort();
  document.querySelector("#moviez-sort").appendChild(sort.view.dom);

  var search = new Search();
  document.querySelector("#search-moviez").appendChild(search.view.dom);

  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);

  var user = new User();
  //document.querySelector("#user").appendChild(user.register.dom);
  //document.querySelector("#user").appendChild(user.login.dom);
  //document.querySelector("#user").appendChild(user.profile.dom);
  


  /** These probably shouldn't be here, fix **/
  var currentUser = localStorage.getItem("user");
  var loggedIn = currentUser ? true : false;
  var moviez = undefined;

  API.fetchGenres(function (genres) {
    genres.forEach(Search.prototype.addGenre, search);
  });

  user.registerResultCallback = function (user) {
    userLoggedIn = true;
    user.register.hide();
    user.login.hide();
    user.setUser(user);
    currentUser = user;
  }

  user.loginResultCallback = function (user) {
    userLoggedIn = true;
    user.register.hide();
    user.login.hide();
    user.setUser(user);
    currentUser = user;
  }

  user.logoutResultCallback = function () {
    user.profile.hide();
    user.login.show();
    user.register.show();
    user.setUser(undefined);
    currentUser = undefined;
  }

  detail.onRatingCallback = function (id, rating) {
    if (userLoggedIn) {
      API.rate(id,rating,currentUser.id, 
               function (r) {
                 detail.updateRating(r);
               });      
    } else {
      alert("You must be logged in to rate a movie");
    }
  }

  list.onMovieRated = function (id,rating) {
    if (userLoggedIn) {
      API.rate(id,rating,currentUser.id, function (r) {
        list.updateMovie(r);
      });
    } else {
      alert("You must be logged in to rate a movie");
    }
  }

  list.onMovieSelected = function (movie) {
    window.location = window.location + "movie" + "?id=" + movie.id;
//    detail.setMovie(movie);
  };

  sort.sortCallback = function (sort) {
    var sorted = sort(moviez);
    list.clear();
    sorted.forEach(List.prototype.addMovie, list);
  }

  search.searchResultCallback = function (r) {
    moviez = r;
    list.clear();
    r.forEach(List.prototype.addMovie, list);
  };

  search.randomResultCallback = function (movie) {
    detail.setMovie(movie);
  }

  // Fill the page with movies on load
  search.search();

});
