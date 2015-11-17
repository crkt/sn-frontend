define(['controllers/movie/list',
        'controllers/search',
        'controllers/user/login'], function(MovieListController, 
                                            SearchController, 
                                            UserController) 
{
  function Application () {
    this.loggedIn = false;                                             
  }
  
  Application.prototype.onLogin = function (user) {
    console.log("User logged in: " + user);
    this.loggedIn = true;
  }
  
  var app = new Application();
  var list = new MovieListController();
  var search = new SearchController(list);
  var uc = new UserController(app.onLogin);


  return Application;
});
