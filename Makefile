DEST := out

.PHONY: all
all: convert-images build-html copy-css copy-js $(DEST)/favicon.ico

IMG := $(patsubst %,img/%-200.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-400.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-600.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-800.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-1600.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %.jpg,%.webp,$(IMG))
IMG := $(notdir $(IMG))
IMG := $(patsubst %,$(DEST)/img/%,$(IMG))

$(DEST)/img/%-200.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=400x200 $< -thumbnail '200x100>' \
		-background white -gravity center -extent 200x100 $@ 2>/dev/null

$(DEST)/img/%-400.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=800x400 $< -thumbnail '400x200>' \
		-background white -gravity center -extent 400x200 $@ 2>/dev/null

$(DEST)/img/%-600.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1200x600 $< -thumbnail '600x300>' \
		-background white -gravity center -extent 600x300 $@ 2>/dev/null

$(DEST)/img/%-800.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1600x800 $< -thumbnail '800x400>' \
		-background white -gravity center -extent 800x400 $@ 2>/dev/null

$(DEST)/img/%-1600.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=3200x1600 $< -thumbnail '1600x800>' \
		-background white -gravity center -extent 1600x800 $@ 2>/dev/null

$(DEST)/img/%-200.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=400x200 $< -thumbnail '200x100>' \
		-background white -gravity center -extent 200x100 $@ 2>/dev/null

$(DEST)/img/%-400.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=800x400 $< -thumbnail '400x200>' \
		-background white -gravity center -extent 400x200 $@ 2>/dev/null

$(DEST)/img/%-600.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1200x600 $< -thumbnail '600x300>' \
		-background white -gravity center -extent 600x300 $@ 2>/dev/null

$(DEST)/img/%-800.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1600x800 $< -thumbnail '800x400>' \
		-background white -gravity center -extent 800x400 $@ 2>/dev/null

$(DEST)/img/%-1600.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=3200x1600 $< -thumbnail '1600x800>' \
		-background white -gravity center -extent 1600x800 $@ 2>/dev/null

$(DEST)/favicon.ico: src/ico/favicon.ico
	@cp $< $@

.PHONY: convert-images
convert-images: $(IMG)

$(DEST)/index.html: build-page.js index.hbs
	node build-page.js out/index.html

.PHONY: build-html
build-html: $(DEST)/index.html

$(DEST)/css/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	@mkdir -p $(DEST)/css/
	@cp $< $@

.PHONY: copy-css
copy-css: $(DEST)/css/bootstrap.min.css

$(DEST)/js/bootstrap.bundle.min.js: node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
	@mkdir -p $(DEST)/js/
	@cp $< $@

$(DEST)/js/jquery.slim.min.js: node_modules/jquery/dist/jquery.slim.min.js
	@mkdir -p $(DEST)/js/
	@cp $< $@

$(DEST)/js/main.min.js: src/js/main.js
	@mkdir -p $(DEST)/js/
	curl -s -L https://closure-compiler.appspot.com/compile \
		--data-urlencode js_code@src/js/main.js \
		-d compilation_level=ADVANCED_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code > $@

.PHONY: copy-js
copy-js: $(DEST)/js/bootstrap.bundle.min.js $(DEST)/js/jquery.slim.min.js $(DEST)/js/main.min.js

.PHONY: dist
dist: clean-dist all
	node build-dist.js

.PHONY: clean-dist
clean-dist:
	@rm -rf dist

.PHONY: clean
clean: clean-dist
	@rm -rf out