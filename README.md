# sn-frontend

The sortnight frontend, using javascript and an apache to perform requests to the backend.

## Config

You will need to have [Apache httpd server](https://httpd.apache.org/) installed. 
If you're running linux, your package manager will probably have apache as an available package in that case:
```
apt-get install apache
```
Will do the trick.

Some configurations that must be present in the config file of apache. On linux it can be found in /etc/httpd/conf/httpd.conf. Don't know the location of windows.
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

 If you're setting up apache on windows, you're on your own. If you get it working, please write how you did it here.

## License

Copyright © 2015 SortNight

