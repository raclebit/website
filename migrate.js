const { exec } = require('child_process')

exec('node -r dotenv/config node_modules/.bin/payload migrate', 
  { env: process.env },
  (error, stdout, stderr) => {
    if (error) {
      console.log('Migration output:', stdout)
      console.error('Migration error (may be ok if already migrated):', stderr)
    } else {
      console.log('Migration successful:', stdout)
    }
    process.exit(0)
  }
)