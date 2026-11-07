ARG WEKAN_VERSION=13.00
FROM ghcr.io/wekan/wekan:v${WEKAN_VERSION}

# The upstream image correctly runs as the unprivileged `wekan` account. The
# Supervisor creates this app's private /data directory as root, so the small
# launcher starts as root only long enough to make that directory writable,
# then drops back to `wekan` before starting WeKan.
USER root
COPY --chmod=755 run.sh /usr/local/bin/home-assistant-wekan
ENTRYPOINT ["/usr/local/bin/home-assistant-wekan"]
