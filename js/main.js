requirejs.config({
  baseURL: "js/lib",

});


requirejs(['application'],function(Application) 
{    
  var app = new Application();
});
