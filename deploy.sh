#!/bin/bash

LOCAL_ROOT=$(dirname $0)
REMOTE_ROOT=/root/digital-strength/

usage() { echo "Usage: $0 [-s] [-c]" 1>&2; exit 1; }

while getopts ":sc" opt; do
    case "${opt}" in
        s)
            rsync -avzhc $LOCAL_ROOT/server_build digitalstrength.dev:$REMOTE_ROOT
            rsync -avzhc $LOCAL_ROOT/ecosystem.config.js digitalstrength.dev:$REMOTE_ROOT
            exit 0
            ;;
        f)
            rsync -avzhc $LOCAL_ROOT/build digitalstrength.dev:$REMOTE_ROOT
            exit 0
            ;;
    esac
done

rsync -avzhc $LOCAL_ROOT/build digitalstrength.dev:$REMOTE_ROOT
rsync -avzhc $LOCAL_ROOT/server_build digitalstrength.dev:$REMOTE_ROOT
rsync -avzhc $LOCAL_ROOT/ecosystem.config.js digitalstrength.dev:$REMOTE_ROOT
