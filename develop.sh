#!/bin/bash
bash start_mongod.sh&
npm install
nodemon -e js,jade,styl,js
