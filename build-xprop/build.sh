#!/bin/sh
set -eu

src=/src
bld=/build
out=/out

git clone $GIT $src
cd $src && git checkout $REF

mkdir -p $bld $out
cd /build
$src/autogen.sh
make -j$(nproc)
chmod 0755 xprop
cp xprop $out/
