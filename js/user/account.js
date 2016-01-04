define([], function () {

  /**
     Account

  **/

  /**
     Account view
  **/
  function AccountView() {
    var template = document.querySelector("#user-info");
    this.dom = document.importNode(template.content, true);
    this.userName = this.dom.querySelector(".username");
  }

  AccountView.prototype.setUserName = function (name) {
    this.userName.textContent = name;
  }

  /** 
      Account Presenter 
  **/
  function Account() {
    this.view = new AccountView();
  }

  Account.prototype.setUser = function (user) {
    this.view.setUserName(user.username);
  }

  return Account;
  
});
