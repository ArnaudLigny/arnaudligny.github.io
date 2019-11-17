> Source code of https://narno.org, generated with [Cecil](https://cecil.app).

The website is automatically built and deployed through [Travis CI](https://travis-ci.org/Narno/narno.github.io).

[![Build Status](https://travis-ci.org/Narno/narno.github.io.svg?branch=source)](https://travis-ci.org/Narno/narno.github.io)

## Install, build & deploy
```
composer install
php build.php -e=prod
export GH_TOKEN=your_github_token
sh deploy.sh
```

## Test locally
```
php build.php -e=dev
```
