#!/bin/bash

trap "" 1

pushd `dirname $0`
DATA_DIRECTORY=`pwd`/data
mongod --dbpath $DATA_DIRECTORY
popd
