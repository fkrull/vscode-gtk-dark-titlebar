IMAGE=debian:8-slim

all: npm-compile bin/xprop-arm bin/xprop-arm64 bin/xprop-ia32 bin/xprop-x64

npm-compile:
	npm run compile

clean:
	rm -rf bin out

bin:
	mkdir -p bin

bin/xprop-%: bin
	docker run --rm -i \
		-v $(PWD)/bin:/out \
		-v $(PWD)/extract-xprop.sh:/extract-xprop.sh \
		$(IMAGE) \
		/bin/sh /extract-xprop.sh $*
