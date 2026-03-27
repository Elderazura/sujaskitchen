#!/usr/bin/env bash
# Fast WebM for Suja clips: VP8 + -deadline realtime (much faster than VP9 CRF).
# Scales max width 480px, strips audio. Requires ffmpeg.
#
# Usage: npm run video:suja
# Reads public/Suja/*.mp4 (and .mov). Writes public/Suja/suja-1.webm, suja-2.webm, ...
#
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIR="$ROOT/public/Suja"
mkdir -p "$DIR"

files=()
for f in "$DIR"/*.mp4 "$DIR"/*.MP4 "$DIR"/*.mov "$DIR"/*.MOV; do
  [[ -f "$f" ]] || continue
  case "$(basename "$f")" in suja-*.webm) continue ;; esac
  files+=("$f")
done

if [ ${#files[@]} -eq 0 ]; then
  echo "No .mp4 or .mov in $DIR"
  exit 0
fi

sorted=()
while IFS= read -r line; do
  [[ -n "$line" ]] && sorted+=("$line")
done < <(printf '%s\n' "${files[@]}" | LC_ALL=C sort)

i=1
pids=()
for f in "${sorted[@]}"; do
  dest="$DIR/suja-${i}.webm"
  echo "[$i] $(basename "$f") -> $(basename "$dest")"
  ffmpeg -y -i "$f" \
    -vf "scale=min(480\,iw):-2" \
    -c:v libvpx -deadline realtime -cpu-used 16 -an -auto-alt-ref 0 \
    "$dest" -loglevel error -stats &
  pids+=("$!")
  i=$((i + 1))
  if [ "${#pids[@]}" -ge 4 ]; then
    wait "${pids[0]}"
    pids=("${pids[@]:1}")
  fi
done
for pid in "${pids[@]}"; do wait "$pid" || true; done

echo "Done. Sync lib/sujaTickerVideos.ts if clip count changed. Optional: remove source MP4s to save space."
