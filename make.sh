#!/bin/bash

rm -r build/*;

cp -r dist build;
cp index.js build;
cp deck-model.js build;
cp package.json build;