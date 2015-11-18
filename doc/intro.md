# Introduction to sn-frontend
TODO: write [great documentation](http://jacobian.org/writing/what-to-write/) 

The client for the user.

## General information
### What code do I write?
Javascript for logic, css for style, html for view structure. Things to read to get an understanding of this crazy things works:
* [Introduction to Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
* [Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
* [General Syntax help & Explanation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* [Javascript bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [CSS resource](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [HTML resource](https://developer.mozilla.org/en-US/docs/Web/HTML)

### Where do I put my files?
- CSS? the css folder.
- JS? the javascript folder
-- Is it a model? Yes, then js/models/
-- Is it a view? Yes, then js/views/
-- Is it a controller? Yes, then js/controllers/
-- Is it a widget? Yes, then js/widgets/
- HTML? We only have index.html, we then select the divs with javascript in the controllers. See search or login controllers.
- Unknown? Ask yourself if it's really part of the project.

### Why is there views, controllers and models?
We're trying to use a interface pattern called Model View Controller, notice how I wrote trying. This is to seperate view and logic. And strive for an understandable structure of the code.

### Where is the main function? The one that does everything?
The [main.js](https://github.com/Fruitschinpo/sn-frontend/blob/master/js/main.js) file is the requirejs config file, and it uses the [application.js](https://github.com/Fruitschinpo/sn-frontend/blob/master/js/application.js) file, that is where you put all of the "main" code. To tie everything together.

### How do I import code from another JS file to my JS file?
Aahh, we use something called [RequireJS](http://requirejs.org/docs/api.html)

This allows us to treat our JS files as modules, and import them. See the requireJS docs for more information.

### How the fuck do I make a request to our server?
Woah! Easy! It's actually quite simple. The file request.js has the logic for sending data to our server. So you would import it and use it in your code, see the search controller for how to use it. 

#### I meant how it actually does it...
It uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) See the request.js file for how to use it.

### My code won't run...
[Don't Panic!](https://www.youtube.com/watch?v=d-diB65scQU)

Just relax, and try to find the problem. Use the inspect element function in your browser and change to console mode to see what's happening.
