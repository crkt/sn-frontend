requirejs.config({
  baseURL: "js/lib",

});


requirejs(['controllers/user/login', 
           'controllers/movie/list',
           'controllers/search',
           'views/header'], function(UserLogin, MovieList, Search, Header) {            
             var header = new Header();
             var list = new MovieList();
             var search = new Search(list);

});
