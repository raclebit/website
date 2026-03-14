const { execSync } = require('child_process')

try {
  console.log('Running migrations...')
  execSync('node node_modules/.bin/payload migrate', {
    stdio: 'inherit',
    env: process.env
  })
  console.log('Migrations complete')
} catch (e) {
  console.log('Migration error (may already be migrated):', e.message)
}