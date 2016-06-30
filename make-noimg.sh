#!/bin/bash
grunt build-noimg

rm -r build/*;

cp -r dist build/public;
cp index.js build;
cp package.json build;
cp -r src build;

git checkout build/public/images

#cd build;

#node index.js;