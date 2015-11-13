define(['views/user/login'], function(UserView) {
  
  var mainContent = document.querySelector("#main-content");
  

  var login = new UserView.Login(mainContent);
  var register = new UserView.Register(mainContent);

  return {};

});
