DEST := out

.PHONY: all
all: convert-images build-html copy-css

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
	convert -define jpeg:size=400x400 $< -thumbnail '200x150>' \
		-background white -gravity center -extent 200x150 $@ 2>/dev/null

$(DEST)/img/%-400.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=800x800 $< -thumbnail '400x300>' \
		-background white -gravity center -extent 400x300 $@ 2>/dev/null

$(DEST)/img/%-600.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1200x1200 $< -thumbnail '600x450>' \
		-background white -gravity center -extent 600x450 $@ 2>/dev/null

$(DEST)/img/%-800.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1600x1600 $< -thumbnail '800x600>' \
		-background white -gravity center -extent 800x600 $@ 2>/dev/null

$(DEST)/img/%-1600.webp: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=3200x3200 $< -thumbnail '1600x1200>' \
		-background white -gravity center -extent 1600x1200 $@ 2>/dev/null

$(DEST)/img/%-200.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=400x400 $< -thumbnail '200x200>' \
		-background white -gravity center -extent 200x200 $@ 2>/dev/null

$(DEST)/img/%-400.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=800x800 $< -thumbnail '400x400>' \
		-background white -gravity center -extent 400x400 $@ 2>/dev/null

$(DEST)/img/%-600.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1200x1200 $< -thumbnail '600x600>' \
		-background white -gravity center -extent 600x600 $@ 2>/dev/null

$(DEST)/img/%-800.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=1600x1600 $< -thumbnail '800x800>' \
		-background white -gravity center -extent 800x800 $@ 2>/dev/null

$(DEST)/img/%-1600.jpg: src/img/%.*
	@mkdir -p $(DEST)/img/
	convert -define jpeg:size=3200x3200 $< -thumbnail '1600x1600>' \
		-background white -gravity center -extent 1600x1600 $@ 2>/dev/null

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

.PHONY: dist
dist: clean-dist all
	node build-dist.js

.PHONY: clean-dist
clean-dist:
	@rm -rf dist

.PHONY: clean
clean: clean-dist
	@rm -rf out