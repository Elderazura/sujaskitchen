#!/usr/bin/env bash
# Encode every *.mp4 in public/video to VP9 WebM (muted). Requires ffmpeg.
# Run after adding new MP4s: bash scripts/encode-public-videos-webm.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/video"
mkdir -p "$DIR"
shopt -s nullglob
for f in "$DIR"/*.mp4; do
  base="${f%.mp4}"
  echo "Encoding $(basename "$f") -> $(basename "$base").webm"
  # CRF 36–40: higher = smaller file, lower quality. Raise if output is larger than MP4.
  ffmpeg -y -i "$f" \
    -c:v libvpx-vp9 -crf 38 -b:v 0 \
    -row-mt 1 -cpu-used 4 -threads 0 \
    -an \
    "${base}.webm" -loglevel error -stats
done
echo "Done. Remove .mp4 files manually if you only want WebM in git."
