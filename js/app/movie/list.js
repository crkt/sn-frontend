define([], function() {
  var exports = {};


  var list = document.querySelector("#results");

  var addMovie = function(movie) {
    for (var key in movie) {
      var item = document.createElement("li");
      if (key === "genres") {
        for ( var genre in movie[key]) {
          item.innerHTML += movie[key][genre]["genre"] + " ";
        }
      } else {
        item.innerHTML = key + ":" + " " + movie[key];     
      }
      list.appendChild(item);
    }
  };
  

  var onChange = function (data) {
    for (var x in data) {
      addMovie(data[x]);
    }
  }

  exports.onChange = onChange;

  return exports;
});
