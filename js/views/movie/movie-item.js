define([],function()
{

  /*
    <template id="movie-preview">
    <div class="movie-preview">
    <img class="main-image"></img>
    <h1 class="title"></h1>
    <p class="plot">
    </p>
    <span class="rating">
    </template>
   */
  function MovieItemView() {
    this.dom = document.importNode(document.querySelector("#movie-item").content, true);
    this.title = this.dom.querySelector(".title");
    this.plot = this.dom.querySelector(".plot");
    this.image = this.dom.querySelector(".image");
    this.rating = this.dom.querySelector(".rating");
  }
 
  return Movie;

});
