define([], function() {

  var widgets = {};

  function searchInput(type, placeholder, label, onchange) {
    this.content = document.createElement("div");
    this.content.classList.add("search-input");

    this.label = document.createElement("label");
    this.label.classList.add("label");
    this.label.textContent = label;

    this.input = document.createElement("input");
    this.input.classList.add("input");
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

  widgets.search = searchInput;
  widgets.Button = Button;

  return widgets;
});
