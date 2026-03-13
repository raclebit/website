import React from 'react'
import { inter, instrumentSans } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageTransition } from '@/components/ui/PageTransition'
import { cn } from '@/lib/utils'
import { getSiteSettings } from '@/lib/getSiteSettings'

import './globals.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata() {
  const settings = await getSiteSettings()
  
  return {
    title: {
      template: '%s | Raclebit',
      default: 'Raclebit | We Build Digital Systems That Last',
    },
    description: 'Technology partner focused on system architecture, scalability, and long-term reliability.',
    icons: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: settings?.favicon && typeof settings.favicon === 'object' ? (settings.favicon as any).url : '/favicon.ico',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logoLightUrl = settings?.logoLight && typeof settings.logoLight === 'object' ? (settings.logoLight as any).url : undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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