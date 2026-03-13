import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  logoLightUrl?: string
  logoDarkUrl?: string
  logoAlt?: string
  siteName?: string
}

export const Footer = ({ logoDarkUrl, logoAlt, siteName }: FooterProps) => {
  return (
    <footer className="bg-[#1B1B1B] text-[#FAFAFA] border-t border-white/10 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2 mb-6">
              {logoDarkUrl ? (
                <div className="relative h-8 w-32">
                  <Image 
                    src={logoDarkUrl} 
                    alt={logoAlt || 'Raclebit'} 
                    fill
                    className="object-contain object-left" 
                  />
                </div>
              ) : (
                <>
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-black" />
                  </div>
                  {siteName || 'Raclebit'}
                </>
              )}
            </Link>
            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xs">
              Technology that scales with clarity and creates real impact.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-sm mb-6 uppercase tracking-wider text-white/40">Industries</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/80">
              <li>Financial Services</li>
              <li>E-Commerce</li>
              <li>Professional Services</li>
              <li>SaaS & Startups</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-sm mb-6 uppercase tracking-wider text-white/40">Engagement</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/80">
              <li>Project-Based</li>
              <li>Technology Partnership</li>
              <li>System Audit</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-sm mb-6 uppercase tracking-wider text-white/40">Get in Touch</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/80">
              <li><a href="mailto:contact@raclebit.com" className="hover:text-white transition-colors">contact@raclebit.com</a></li>
              <li><a href="tel:+6287856655558" className="hover:text-white transition-colors">+62 878 5665 5558</a></li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between font-sans text-xs text-white/40">
          <p>© {new Date().getFullYear()} Raclebit. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}