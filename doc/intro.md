# Introduction to sn-frontend
TODO: write [great documentation](http://jacobian.org/writing/what-to-write/) 

The client for the user.

## Config
### Apache
We use apache httpd server to host this site.

#### Linux/Mac
You will need to have [Apache httpd server](https://httpd.apache.org/) installed. 
If you're running linux, your package manager will probably have apache as an available package in that case:
```
apt-get install apache
```
Will do the trick.

Some configurations that must be present in the config file of apache. On linux it can be found in.
```
/etc/httpd/conf/httpd.conf
/etc/apache2/conf/apache2.conf
```
On XAMPP click config for apache and then select httpd.confg

```
DocumentRoot "/var/www"
<Directory />
    AllowOverride none
    Require all granted
</Directory>

<Directory "/var/www"> 
    Options Indexes FollowSymLinks

    AllowOverride none

    Require all granted
</Directory>

ProxyPass "/movie" "http://localhost:3000/movie"
ProxyPassReverse "/movie" "http://localhost:3000/movie"
ProxyPass "/search/movie" "http://localhost:3000/search/movie"
ProxyPassReverse "/search/movie" "http://localhost:3000/search/movie"
```

The "/var/www" is the sn-frontend folder where all the html,js is located. e.g "/home/phcr/Project/sn-frontend" I have symlinked my /var/www. 
```
ln -s source destination, on linux. 
e.g ln -s /home/phcr/Project/sn-frontend /var/www
```

 If you're running on linux. Make sure that apache can access your project 
```
chmod o+x folder
```
to make it readable and executable by anyone, see chmod docs for more information. You might have to make the whole home folder readable and executable 
```
chmod -R o+x ~/
```

#### Windows with XAMPP

How to find the config file in XAMPP
[Screenshot](https://github.com/Fruitschinpo/sn-frontend/blob/master/readme-img/bild.png "Screenshot)

Just paste these lines into the config file httpd.conf, set Directory to C:\xampp\htdocs\ and uncomment:
```
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_express_module modules/mod_proxy_express.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_scgi_module modules/mod_proxy_scgi.so
```



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
  - Is it a model? Yes, then js/models/
  - Is it a view? Yes, then js/views/
  - Is it a controller? Yes, then js/controllers/
  - Is it a widget? Yes, then js/widgets/
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
Woah! Easy! It's actually quite simple. The file [request.js](https://github.com/Fruitschinpo/sn-frontend/blob/master/js/app/request.js) has the logic for sending data to our server. So you would import it and use it in your code, see the search controller for how to use it. 

#### I meant how it actually does it...
It uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) See the [request.js](https://github.com/Fruitschinpo/sn-frontend/blob/master/js/app/request.js) file for how to use it.

### My code won't run...
[Don't Panic!](https://www.youtube.com/watch?v=d-diB65scQU)

Just relax, and try to find the problem. Use the inspect element function in your browser and change to console mode to see what's happening.
