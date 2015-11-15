define([], function() {

  var widgets = {};

  function Input(type, placeholder, label, onchange) {
    this.content = document.createElement("div");
    this.content.classList.add("input-widget");

    this.label = document.createElement("label");
    this.label.classList.add("input-label");
    this.label.textContent = label;

    this.input = document.createElement("input");
    this.input.classList.add("value-input");
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.onchange = onchange;

    this.content.appendChild(this.label);
    this.content.appendChild(this.input);
  }

  function Button(type, text) {
    this.content = document.createElement("input");
    this.content.classList.add("submit-button");
    this.content.type = type;
    this.content.value = text;
  }

  widgets.Input = Input;
  widgets.Button = Button;

  return widgets;
});
