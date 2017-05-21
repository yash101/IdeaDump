#!/bin/bash

trap "" 1

pushd `dirname $0`
pushd ..
DATA_DIRECTORY=`pwd`/data
mongod --dbpath $DATA_DIRECTORY
popd
popd
