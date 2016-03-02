#!/bin/bash

rm -r build/*;

cp -r dist build/public;
cp index.js build;
cp deck-model.js build;
cp package.json build;