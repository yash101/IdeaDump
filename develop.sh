#!/bin/bash
bash start_mongod_develop.sh&
npm install
nodemon -e js,jade,styl,js
