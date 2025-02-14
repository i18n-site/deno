#!/usr/bin/env bash

DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR

bun i
if [ -n "$1" ]; then
  export PROJECT=$1
else
  echo "USAGE : $0 project_name"
  exit 1
fi

set -ex

git add .
cd $PROJECT
deno lint
deno fmt
bun x mdt .

if [ -f "mod.coffee" ]; then
  bun x cep -c .
fi

git add .

if [ -f "package.json" ]; then
  npm version patch
  ver=$(cat package.json | jq '.version' -r)
else
  deno run -A jsr:@krlwlfrt/version patch
  ver=$(cat deno.jsonc | jq '.version' -r)
fi
git add -u
git commit -m"$PROJECT@$ver" || true
git pull && git push || true

dist=/tmp/dist/$PROJECT
rm -rf $dist
mkdir -p $dist

cd $dist

sync() {
  rsync \
    --exclude "*.coffee" \
    --exclude "*.mdt" \
    --exclude "*.lock" \
    --exclude ".*" \
    --exclude 'node_modules' \
    --exclude='*_test.js' \
    -av $DIR/$PROJECT/ $dist
}

sync

if [ -f "deno.jsonc" ]; then
  sed -i "2s/^/  \"version\": \"$ver\",\n/" deno.jsonc
  rm -rf package.json *.node.js
  deno publish --token $(cat ~/.config/deno/publish.token)
fi

sync

if [ -f "package.json" ]; then
  rm -rf deno.jsonc
  if [ -f "mod.node.js" ]; then
    mv mod.node.js mod.js
  fi
  bun publish --access public
fi

rm -rf $dist

cd $DIR
./upgrade.sh
