#!/bin/sh
export HOSTNAME="0.0.0.0"
export PORT="${PORT:-8080}"
exec node server.js