requirejs.config({
  baseURL: "js/lib",

});


requirejs(['movie/list','movie/search','movie/sort','api','header'],function(List, Search, Sort, API, Header) 
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

  /** These probably shouldn't be here? **/
  var currentUser = localStorage.getItem("user");
  var loggedIn = currentUser ? true : false;
  var moviez = undefined;

  if (loggedIn) {
    header.userLoggedIn();
  } else {
    header.userLoggedOut();
  }

  header.onSignOut = function () {
    window.location.reload(true);
  }

  list.onMovieSelected = function (movie) {
    window.location = window.location + "movie" + "?id=" + movie.id;
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
    window.location = window.location +"movie" + "?id=" + movie.id;
  }

  // Fill the page with movies on load
  API.fetchGenres(function (genres) {
    genres.forEach(Search.prototype.addGenre, search);
  });

  search.search();

});
