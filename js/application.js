define(['controllers/movie/list',
        'controllers/search',
        'controllers/user/login'], function(MovieListController, 
                                            SearchController, 
                                            UserController) 
{

  function Application () {
    this.loggedIn = false;
    this.loggedInUser = undefined;
  }
  
  Application.prototype.onLogin = function (user) {
    console.log("User logged in: " + user);
    this.loggedIn = true;
    this.loggedInuser = user;
    uc.userLoggedIn(user);
  }

  Application.prototype.onSearch = function (movies) {
    list.clear();
    list.addMovies(movies);
  }

  Application.prototype.onRating = function (id, value) {
    if (this.loggedIn) {
      
    }
  }

  
  
  var app = new Application();
  var list = new MovieListController(app.onRating);
  var search = new SearchController(app.onSearch);
  var uc = new UserController(app.onLogin);


  return Application;
});
