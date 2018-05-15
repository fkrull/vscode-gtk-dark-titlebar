#!/bin/sh
set -eu

arch=$1
os=linux
package=x11-utils
binary=usr/bin/xprop
work=/work
out=/out

case $arch in
    arm) debarch=armhf;;
    arm64) debarch=arm64;;
    ia32) debarch=i386;;
    x64) debarch=amd64;;
    *)
        echo Invalid architecture $arch
        exit 1
        ;;
esac

mkdir -p $work $out
cd $work

echo Getting xprop-${os}-${arch} ...

dpkg --add-architecture $debarch
apt-get update
apt-get download ${package}:${debarch}
dpkg-deb -x ${package}_*_${debarch}.deb .
chmod 0755 $binary
cp $binary $out/xprop-${os}-${arch}
