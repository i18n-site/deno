#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -a
. ../../conf/srv/cron/_pg.env
. ../../conf/srv/r.env
set +a
set -ex

./build.sh

deno -A mod_test.js
