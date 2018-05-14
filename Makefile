TAG := build-xprop
XPROP_GIT := http://anongit.freedesktop.org/git/xorg/app/xprop.git/
XPROP_REF := xprop-1.2.3

all: npm-compile bin/xprop

image:
	docker build -t $(TAG) build-xprop

clean:
	-docker image rm $(TAG)
	rm -rf bin out

bin:
	mkdir -p bin

bin/xprop: image bin
	docker run --rm \
		-e GIT=$(XPROP_GIT) \
		-e REF=$(XPROP_REF) \
		-v $(PWD)/bin:/out \
		build-xprop

npm-compile:
	npm run compile
