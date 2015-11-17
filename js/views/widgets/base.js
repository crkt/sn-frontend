define([], function() {

  var widgets = {};

  function Base(element) {
    this.element = document.createElement(element);
  }

  Base.prototype.toggleClass = function (c, t) {
    this.element.classList.toggle(c, t);
  }

  Base.prototype.setEvent = function(event, f) {
    this.element[event] = f;
  }

  Base.prototype.setAttribute = function (x, y) {
    this.element.setAttribute(x,y);
  }

  Base.prototype.addChild = function (x) {
    this.element.appendChild(x);
  }

  Base.prototype.addClass = function (x) {
    this.element.classList.add(x);
  }

  
  function Input(type, placeholder, callback) {
    Base.call(this, "input");
    this.element.type = type;
    this.element.placeholder = placeholder;
    this.callback = callback;

    this.setEvent("onchange", this.onChange.bind(this));
  }

  Input.prototype = Object.create(Base.prototype);
  Input.prototype.constructor = Input;

  Input.prototype.onChange = function (e) {
    e.preventDefault();
    console.log("Input base onChange");
    this.callback(e.target.value);
  }

  Input.prototype.clear = function () {
    this.element.value = "";
  }

  Input.prototype.getValue = function () {
    return this.element.value;
  }
  
  function Label(text) {
    Base.call(this, "label");
    this.element.textContent = text;
  }

  Label.prototype = Object.create(Base.prototype);
  Label.prototype.constructor = Label;

  Label.prototype.setContent = function (x) {
    this.element.textContent = x;
  }

  function Button(type, text, callback) {
    Base.call(this, "button");
    this.element.type = type;
    this.element.textContent = text;
    
    this.callback = callback;

    this.setEvent("onclick", this.onClick.bind(this));
  }

  Button.prototype = Object.create(Base.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.onClick = function (e) {
    e.preventDefault();
    this.callback(e);
  }

  Button.prototype.setDisabled = function (t) {
    this.element.disabled = t;
  }

  widgets.Base = Base;
  widgets.Input = Input;
  widgets.Label = Label;
  widgets.Button = Button;

  return widgets;

});

