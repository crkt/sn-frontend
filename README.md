# sn-frontend

The sortnight frontend, using javascript and an apache to perform requests to the backend.

## Wiki
Refer to [Wiki](https://github.com/Fruitschinpo/sn-frontend/wiki)

## Apache config
Our apache config looks like this:
```
DocumentRoot "/PATH/TO/FRONTEND"
<Directory />
    AllowOverride none
    Require all granted
</Directory>

<Directory "/PATH/TO/FRONTEND"> 

    # We can write localhost/register and it will refer to the localhost/register.html file
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^([^\.]+)$ $1.html [NC,L]

    # Follow SymLinks, If you symlink your /PATH/TO/FRONTEND
    Options Indexes FollowSymLinks

    AllowOverride none

    Require all granted
</Directory>

ProxyPass "/search/" "http://localhost:3000/search/"
ProxyPassReverse "/search/" "http://localhost:3000/search/"

ProxyPass "/user/" "http://localhost:3000/user/"
ProxyPassReverse "/user/" "http://localhost:3000/user/"

ProxyPass "/movie/" "http://localhost:3000/movie/"
ProxyPassReverse "/movie/" "http://localhost:3000/movie/"
```

This config is required for the server and frontend to work. Otherwise the api in this project won't send the requests to the correct place.
## License

Copyright © 2015 SortNight

