#!/bin/sh
set -e

echo "Running PayloadCMS migrations..."
node migrate.js || echo "Migration skipped or already done"

echo "Starting Next.js server..."
exec HOSTNAME=0.0.0.0 PORT=${PORT:-8080} node server.js