#!/bin/sh
DOWNLOADED_FOLDER=/Users/axelhzf/Downloads/utorrent/downloaded \
SHOWS_FOLDER=/Users/axelhzf/Downloads/utorrent/tvshows \
UTORRENT_USER=axelhzf \
UTORRENT_PASSWORD=blotts \
UTORRENT_PORT=40959 \
ENV=dev \
node --harmony lib/server.js
