GEN := gen
DEV := out
DIST := dist

.PHONY: all
all: dev

IMG := $(patsubst %,img/%-200.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-400.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-600.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-800.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %,img/%-1600.jpg, $(basename $(wildcard src/img/*)))
IMG := $(IMG) $(patsubst %.jpg,%.webp,$(IMG))
IMG := $(notdir $(IMG))
IMG := $(patsubst %,$(GEN)/img/%,$(IMG))

$(GEN)/img/%-200.webp: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=400x200 $< -thumbnail '200x100>' \
		-background white -gravity center -extent 200x100 $@ 2>/dev/null

$(GEN)/img/%-400.webp: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=800x400 $< -thumbnail '400x200>' \
		-background white -gravity center -extent 400x200 $@ 2>/dev/null

$(GEN)/img/%-600.webp: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=1200x600 $< -thumbnail '600x300>' \
		-background white -gravity center -extent 600x300 $@ 2>/dev/null

$(GEN)/img/%-800.webp: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=1600x800 $< -thumbnail '800x400>' \
		-background white -gravity center -extent 800x400 $@ 2>/dev/null

$(GEN)/img/%-1600.webp: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=3200x1600 $< -thumbnail '1600x800>' \
		-background white -gravity center -extent 1600x800 $@ 2>/dev/null

$(GEN)/img/%-200.jpg: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=400x200 $< -thumbnail '200x100>' \
		-background white -gravity center -extent 200x100 $@ 2>/dev/null

$(GEN)/img/%-400.jpg: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=800x400 $< -thumbnail '400x200>' \
		-background white -gravity center -extent 400x200 $@ 2>/dev/null

$(GEN)/img/%-600.jpg: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=1200x600 $< -thumbnail '600x300>' \
		-background white -gravity center -extent 600x300 $@ 2>/dev/null

$(GEN)/img/%-800.jpg: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=1600x800 $< -thumbnail '800x400>' \
		-background white -gravity center -extent 800x400 $@ 2>/dev/null

$(GEN)/img/%-1600.jpg: src/img/%.*
	@mkdir -p $(GEN)/img/
	convert -define jpeg:size=3200x1600 $< -thumbnail '1600x800>' \
		-background white -gravity center -extent 1600x800 $@ 2>/dev/null

.PHONY: convert-images
convert-images: $(IMG)

$(DEV)/favicon.ico: src/ico/favicon.ico
	@mkdir $(DEV)
	@cp $< $@

$(DIST)/favicon.ico: src/ico/favicon.ico
	@mkdir $(DIST)
	@cp $< $@

.PHONY: dev
dev: convert-images $(DEV)/favicon.ico
	node build-page.js dev

# $(DEST)/js/main.min.js: src/js/main.js
# 	@mkdir -p $(DEST)/js/
# 	curl -s -L https://closure-compiler.appspot.com/compile \
# 		--data-urlencode js_code@src/js/main.js \
# 		-d compilation_level=ADVANCED_OPTIMIZATIONS \
# 		-d output_format=text \
# 		-d output_info=compiled_code > $@

.PHONY: dist
dist: clean-dist convert-images $(DIST)/favicon.ico
	node build-page.js dist

.PHONY: clean
clean: clean-dist
	@rm -rf out

.PHONY: clean-dist
clean-dist:
	@rm -rf dist

.PHONY: clean-gen
clean-gen:
	@rm -rf gen
