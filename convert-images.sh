#!/bin/bash

set -e
set -u

rm -rf public/img
mkdir -p public/img

do_copy() {
  local source_img="$1"
  local width="$2"
  local extension="$3"

	local hash=$(shasum -a 256 ".out.${extension}" | awk '{print $1}')
	local bn="$(basename -- "$img")"
  local filename="${bn%.*}"

	mv ".out.${extension}" "public/img/${filename}-${hash}-${width}.${extension}"
}

do_convert () {
  local img="$1"

	convert -define jpeg:size=400x200 "$img" -thumbnail '200x100>' -background white -gravity center -extent 200x100 ".out.jpg"
	do_copy "$img" "200" "jpg"
	convert -define jpeg:size=800x400 "$img" -thumbnail '400x200>' -background white -gravity center -extent 400x200 ".out.jpg"
	do_copy "$img" "400" "jpg"
	convert -define jpeg:size=1200x600 "$img" -thumbnail '600x300>' -background white -gravity center -extent 600x300 ".out.jpg"
	do_copy "$img" "600" "jpg"
	convert -define jpeg:size=1600x800 "$img" -thumbnail '800x400>' -background white -gravity center -extent 800x400 ".out.jpg"
	do_copy "$img" "800" "jpg"
	convert -define jpeg:size=3200x1600 "$img" -thumbnail '1600x800>' -background white -gravity center -extent 1600x800 ".out.jpg"
	do_copy "$img" "1600" "jpg"
	convert -define jpeg:size=400x200 "$img" -thumbnail '200x100>' -background white -gravity center -extent 200x100 ".out.webp"
	do_copy "$img" "200" "webp"
	convert -define jpeg:size=800x400 "$img" -thumbnail '400x200>' -background white -gravity center -extent 400x200 ".out.webp"
	do_copy "$img" "400" "webp"
	convert -define jpeg:size=1200x600 "$img" -thumbnail '600x300>' -background white -gravity center -extent 600x300 ".out.webp"
	do_copy "$img" "600" "webp"
	convert -define jpeg:size=1600x800 "$img" -thumbnail '800x400>' -background white -gravity center -extent 800x400 ".out.webp"
	do_copy "$img" "800" "webp"
	convert -define jpeg:size=3200x1600 "$img" -thumbnail '1600x800>' -background white -gravity center -extent 1600x800 ".out.webp"
	do_copy "$img" "1600" "webp"
}

for img in src/img/*; do
  do_convert "$img"
done
