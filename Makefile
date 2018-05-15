IMAGE=debian:8-slim

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
		-v $(PWD)/bin:/out \
		-v $(PWD)/extract-xprop.sh:/extract-xprop.sh \
		$(IMAGE) \
		/bin/sh /extract-xprop.sh $*
