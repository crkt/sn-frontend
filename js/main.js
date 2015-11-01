requirejs.config({
  baseURL: "js/lib",

});


requirejs(['app/request', 'app/movie/search', 'app/movie/list'], function(Request, Search, List) {
  
  Search.onSearch = List.onChange;

});
