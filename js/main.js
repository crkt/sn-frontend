requirejs.config({
  baseURL: "js/lib",

});


requirejs(['controllers/movie/list',
           'controllers/search',
           'controllers/user/login'], function(MovieListController, SearchController, UserController) {    
                                       
             function Main () {
               this.loggedIn = false;                                             
             }

             Main.prototype.onLogin = function (user) {
               console.log("User logged in: " + user);
               this.loggedIn = true;
             }

             var main = new Main();

             var list = new MovieListController();
             var search = new SearchController(list);
             var uc = new UserController(main);
             
});
