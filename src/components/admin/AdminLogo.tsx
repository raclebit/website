'use client'

/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const AdminLogo = () => {
  const [logoUrl, setLogoUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetch('/api/globals/site-settings?depth=1')
      .then(res => res.json())
      .then(data => {
        if (data?.logoLight?.url) {
          setLogoUrl(data.logoLight.url)
        }
      })
      .catch(() => {
        // Fallback ke teks jika fetch gagal
      })
  }, [])

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="Raclebit"
        style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
      />
    )
  }

  // Fallback: teks jika tidak ada logo yang diupload
  return (
    <span style={{
      fontFamily: 'sans-serif',
      fontWeight: 700,
      fontSize: '18px',
      letterSpacing: '-0.02em',
      color: '#1B1B1B',
    }}>
      Raclebit
    </span>
  )
}