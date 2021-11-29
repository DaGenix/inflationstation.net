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

	convert "$img" -resize "300x150" -background white -gravity center -extent 300x150 ".out.jpg"
	do_copy "$img" "300" "jpg"
	convert "$img" -resize "600x300" -background white -gravity center -extent 600x300 ".out.jpg"
	do_copy "$img" "600" "jpg"
	convert "$img" -resize "900x450" -background white -gravity center -extent 900x450 ".out.jpg"
	do_copy "$img" "900" "jpg"
	convert "$img" -resize "1200x600" -background white -gravity center -extent 1200x600 ".out.jpg"
	do_copy "$img" "1200" "jpg"
	convert "$img" -resize "1800x900" -background white -gravity center -extent 1800x900 ".out.jpg"
	do_copy "$img" "1800" "jpg"
	convert "$img" -resize "300x150" -background white -gravity center -extent 300x150 ".out.webp"
	do_copy "$img" "300" "webp"
	convert "$img" -resize "600x300" -background white -gravity center -extent 600x300 ".out.webp"
	do_copy "$img" "600" "webp"
	convert "$img" -resize "900x450" -background white -gravity center -extent 900x450 ".out.webp"
	do_copy "$img" "900" "webp"
	convert "$img" -resize "1200x600" -background white -gravity center -extent 1200x600 ".out.webp"
	do_copy "$img" "1200" "webp"
	convert "$img" -resize "1800x900" -background white -gravity center -extent 1800x900 ".out.webp"
	do_copy "$img" "1800" "webp"
}

for img in src/img/*; do
  do_convert "$img"
done
