define(['user/account','movie/list','api'], function (Account, List, API) {

  // Code goes here
  // Look at the movie/list.js
  // And main.js for adding movies to the list.
  // Look at API to find the user rated searcg query.
  var account = new Account();
  document.querySelector("#profile-info").appendChild(account.view.dom);

  var list = new List();
  document.querySelector("#moviez-list").appendChild(list.view.dom);

  var currentUser = localStorage.getItem("user");
  var loggedIn = currentUser ? true : false;
  var user = {id : localStorage.getItem("user"), 
              username: localStorage.getItem("username")};

  account.setUser(user);

  list.onMovieSelected = function (movie) {
    window.location = "/movie" + "?id=" + movie.id;
  }

  // Fetch the user rated movies
  API.fetchRated(currentUser, function (r) {
    list.clear();
    r.forEach(List.prototype.addMovie, list);
  });

});
