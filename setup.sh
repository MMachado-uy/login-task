#!/bin/sh

cd assets

bower install && npm install

cd ..

npm install

cd assets

grunt build