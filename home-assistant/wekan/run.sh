#!/bin/bash
set -euo pipefail

options=/data/options.json
if [ ! -r "$options" ]; then
  echo "ERROR: Home Assistant did not provide $options." >&2
  exit 1
fi

root_url=$(/build/node -e '
  const fs = require("fs");
  const value = JSON.parse(fs.readFileSync(process.argv[1], "utf8")).root_url;
  process.stdout.write(typeof value === "string" ? value : "");
' "$options")

case "${root_url:-}" in
  "") root_url=http://localhost ;;
  http://*|https://*) ;;
  *)
    echo "ERROR: If set, root_url must be a complete http:// or https:// address." >&2
    exit 1
    ;;
esac

install -d -o wekan -g wekan /data
chown -R wekan:wekan /data

export ROOT_URL="$root_url"
export WRITABLE_PATH=/data
export WEKAN_DB=ferretdb
export PORT=8080
export WITH_API=true
export DDP_TRANSPORT=sockjs
export HOME_ASSISTANT_INGRESS=true

exec setpriv --reuid=wekan --regid=wekan --init-groups -- /build/wekan-entrypoint.sh
