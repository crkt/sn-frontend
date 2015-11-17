define([], function() {

  var widgets = {};

  function Base(element) {
    this.element = document.createElement(element);

    this.element.onchange = this.onChange.bind(this);
    this.element.onclick = this.onClick.bind(this);
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

  
  function Input(type, placeholder, onchange) {
    Base.call(this, "input");
    this.element.type = type;
    this.element.placeholder = placeholder;

    this.onChange = onchange;
  }

  Input.prototype.onChange = function (e) {
    console.log("on change bro");
  }
  
  Input.prototype = Object.create(Base.prototype);
  Input.prototype.constructor = Input;

  function Label(text) {
    Base.call(this, "label");
    this.element.textContent = text;
  }

  Label.prototype = Object.create(Base.prototype);
  Label.prototype.constructor = Label;

  function Button(type, text) {
    Base.call(this, "button");
    this.element.type = type;
    this.element.textContent = text;
  }

  Button.prototype = Object.create(Base.prototype);
  Button.prototype.constructor = Button;

  widgets.Base = Base;
  widgets.Input = Input;
  widgets.Label = Label;
  widgets.Button = Button;

  return widgets;

});

