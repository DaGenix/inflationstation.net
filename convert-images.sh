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
	local bn="$(basename -- "$source_img")"
  local filename="${bn%.*}"

	mv ".out.${extension}" "public/img/${filename}-${hash}-${width}.${extension}"
}

resize_png() {
  local img="$1"
  local size="$2"
  magick "$img" -resize "${size}" -background white -gravity center -extent "${size}" .out.png
}

convert_avif() {
  local img="$1"
  local size="$2"
  resize_png "$img" "$size"
  ffmpeg -y -v error -i .out.png -c:v libaom-av1 -still-picture 1 -crf 40 -cpu-used 3 .out.avif
  rm -f .out.png
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
	convert_avif "$img" "300x150"
	do_copy "$img" "300" "avif"
	convert_avif "$img" "600x300"
	do_copy "$img" "600" "avif"
	convert_avif "$img" "900x450"
	do_copy "$img" "900" "avif"
	convert_avif "$img" "1200x600"
	do_copy "$img" "1200" "avif"
	convert_avif "$img" "1800x900"
	do_copy "$img" "1800" "avif"
}

for img in src/img/*; do
  do_convert "$img"
done