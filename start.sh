#!/bin/sh
set -e

echo "Running PayloadCMS migrations..."
node migrate.cjs || echo "Migration skipped"

echo "Starting Next.js server..."
export HOSTNAME="0.0.0.0"
export PORT="${PORT:-8080}"
exec node server.js