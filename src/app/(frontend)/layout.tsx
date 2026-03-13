import React from 'react'
import { inter, instrumentSans } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageTransition } from '@/components/ui/PageTransition'
import { cn } from '@/lib/utils'
import { getSiteSettings } from '@/lib/getSiteSettings'

import './globals.css'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  
  return {
    title: {
      template: '%s | Raclebit',
      default: 'Raclebit | We Build Digital Systems That Last',
    },
    description: 'Technology partner focused on system architecture, scalability, and long-term reliability.',
    icons: {
      icon: settings?.favicon && typeof settings.favicon === 'object' ? (settings.favicon as any).url : '/favicon.ico',
      apple: settings?.favicon && typeof settings.favicon === 'object' ? (settings.favicon as any).url : '/apple-touch-icon.png',
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  
  const logoLightUrl = settings?.logoLight && typeof settings.logoLight === 'object' ? (settings.logoLight as any).url : undefined
  const logoDarkUrl = settings?.logoDark && typeof settings.logoDark === 'object' ? (settings.logoDark as any).url : undefined
  const logoAlt = settings?.logoAlt || 'Raclebit'
  const siteName = settings?.siteName || 'Raclebit'

  return (
    <html lang="en" className={cn(inter.variable, instrumentSans.variable, "bg-white text-black")}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-black selection:text-white">
        <CustomCursor />
        <Navbar 
          logoLightUrl={logoLightUrl}
          logoDarkUrl={logoDarkUrl}
          logoAlt={logoAlt}
          siteName={siteName}
        />
        <main className="flex-grow pt-20">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer 
          logoLightUrl={logoLightUrl}
          logoDarkUrl={logoDarkUrl}
          logoAlt={logoAlt}
          siteName={siteName}
        />
      </body>
    </html>
  )
}