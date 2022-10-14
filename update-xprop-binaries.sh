#!/bin/sh -eux
BASE_URL="https://deb.debian.org/debian/pool/main/x/x11-utils"
PACKAGE="x11-utils"
VERSION="7.7+4"
OS="linux"
BINARY="usr/bin/xprop"

OUT="bin"
WORK="$(mktemp -d)"
trap "rm -rf $WORK" EXIT

download_xprop() {
    ARCH="$1"
    DEB_ARCH="$2"

    echo Getting xprop-$OS-$ARCH ...
    curl -o "$WORK/$ARCH.deb" "$BASE_URL/${PACKAGE}_${VERSION}_${DEB_ARCH}.deb"
    dpkg-deb -x "$WORK/$ARCH.deb" "$WORK"
    chmod 0755 "$WORK/$BINARY"
    cp "$WORK/$BINARY" "$OUT/xprop-$OS-$ARCH"
    dpkg-deb -I "$WORK/$ARCH.deb" > "$OUT/xprop-$OS-$ARCH.info"
}

mkdir -p "$OUT"
rm -rf "$OUT/*"
download_xprop arm armhf
download_xprop arm64 arm64
download_xprop ia32 i386
download_xprop x64 amd64
