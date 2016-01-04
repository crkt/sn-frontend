define(['api','movie/register'], function(API, Register) {

  /**
     Movie Register

     Register a movie file, main.
   **/
  
  var register = new Register();
  document.querySelector("#movie").appendChild(register.view.dom);

  register.registerCallback = function (id) {
    // Go back to the main page with the user
    window.location = "/movie" + "?id=" + id.id;
  }

});
