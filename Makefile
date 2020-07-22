IMAGE=debian:9-slim
curdir=$(shell pwd)

all: npm-compile xprop-binaries

npm-compile:
	npm run compile

xprop-binaries: \
	bin/xprop-linux-arm \
	bin/xprop-linux-arm64 \
	bin/xprop-linux-ia32 \
	bin/xprop-linux-x64

clean:
	rm -rf bin out

bin:
	mkdir -p bin

bin/xprop-linux-%: bin
	docker run --rm -i \
		-v $(curdir)/bin:/out \
		-v $(curdir)/extract-xprop.sh:/extract-xprop.sh \
		$(IMAGE) \
		/bin/sh /extract-xprop.sh $*
