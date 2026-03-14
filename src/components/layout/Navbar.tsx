'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface NavbarProps {
  logoLightUrl?: string
  logoDarkUrl?: string
  logoAlt?: string
  siteName?: string
}

export const Navbar = ({ logoLightUrl, logoDarkUrl, logoAlt, siteName }: NavbarProps) => {
  const [_isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Overlay menu refs
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const footerInfoRef = useRef<HTMLDivElement>(null)

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!navRef.current) return

    // Initialize overlay state
    gsap.set(overlayRef.current, { yPercent: -100, visibility: 'hidden' })

    // 3. Pastikan navbar SELALU visible saat load/pathname berubah
    gsap.set(navRef.current, { yPercent: 0 })
    let lastScrollY = window.scrollY
    let ticking = false

    // 2. Ganti pendekatan hide/show ke event listener + GSAP
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollingDown = currentScrollY > lastScrollY
          const pastThreshold = currentScrollY > 80

          if (scrollingDown && pastThreshold) {
            // Hide navbar
            gsap.to(navRef.current, {
              yPercent: -100,
              duration: 0.35,
              ease: 'power2.inOut',
            })
          } else {
            // Show navbar
            gsap.to(navRef.current, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power2.out',
            })
          }

          // Background blur effect
          if (currentScrollY > 80) {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(250,250,250,0.92)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
              duration: 0.3,
            })
          } else {
            gsap.to(navRef.current, {
              backgroundColor: 'rgba(250,250,250,0.72)',
              backdropFilter: 'blur(4px)',
              boxShadow: 'none',
              duration: 0.3,
            })
          }

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [pathname])

  const openMenu = () => {
    if (_isOpen) return
    setIsOpen(true)
    const tl = gsap.timeline()

    // Ensure it's visible before animating
    gsap.set(overlayRef.current, { visibility: 'visible' })

    // 1. Overlay slide turun dari atas
    tl.to(overlayRef.current, {
      yPercent: 0,        // dari -100% -> 0
      y: 0,               // override inline transform
      duration: 0.55,
      ease: 'power4.inOut',
    })

    // 2. Setiap menu item slide masuk dari bawah
    tl.to(itemRefs.current.map(el => el?.querySelector('a')), {
      y: 0,              // dari translateY(100%) -> 0
      duration: 0.55,
      stagger: 0.07,
      ease: 'power3.out',
    }, '-=0.3')

    // 3. Footer info fade in
    tl.to(footerInfoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }, '-=0.2')
  }

  const closeMenu = () => {
    if (!_isOpen) return
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false)
        gsap.set(overlayRef.current, { visibility: 'hidden' })
      }
    })

    // 1. Items slide keluar ke bawah (reverse stagger)
    tl.to([...itemRefs.current].reverse().map(el => el?.querySelector('a')), {
      y: '100%',
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.in',
    })

    // 2. Overlay slide ke atas
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: 'power4.inOut',
    }, '-=0.15')
  }

  // Hover effects for menu items
  const handleItemEnter = (e: React.MouseEvent) => {
    const el = e.currentTarget
    gsap.to(el, { x: 12, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
    // Dim others
    itemRefs.current.forEach(item => {
      const a = item?.querySelector('a')
      if (a && a !== el) {
        gsap.to(a, { opacity: 0.35, duration: 0.3 })
      }
    })
  }

  const handleItemLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget
    gsap.to(el, { x: 0, opacity: pathname === el.getAttribute('href') ? 1 : 0.8, duration: 0.3, ease: 'power2.out' })
    // Restore others
    itemRefs.current.forEach(item => {
      const a = item?.querySelector('a')
      if (a && a !== el) {
        gsap.to(a, { opacity: pathname === a.getAttribute('href') ? 1 : 0.8, duration: 0.3 })
      }
    })
  }

  return (
    <>
      <header 
        ref={navRef} 
        className="fixed top-0 left-0 w-full z-50 bg-[#FAFAFA]/72 backdrop-blur-[4px]"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2 relative z-50">
            {logoLightUrl ? (
              <div className="relative h-8 w-32">
                <Image 
                  src={logoLightUrl} 
                  alt={logoAlt || 'Raclebit'} 
                  fill
                  className="object-contain object-left" 
                  priority
                />
              </div>
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#1B1B1B"/>
                  <rect x="10" y="10" width="12" height="12" fill="#FAFAFA"/>
                </svg>
                <span className="mt-1">{siteName || 'Raclebit'}</span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-[11px] uppercase tracking-[0.1em]">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "relative py-2 text-black/70 hover:text-black transition-colors group",
                  pathname === link.href ? "text-black" : ""
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-px bg-black transform origin-left transition-transform duration-300",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>
          
          <div className="hidden lg:block">
            <Link 
              href="/contact"
              className="font-sans font-medium text-[12px] uppercase tracking-wider px-5 py-2.5 border border-black hover:bg-black hover:text-white transition-colors duration-250"
            >
              Start a Conversation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-50 p-2 w-10 h-10 flex flex-col items-end justify-center gap-[6px] focus:outline-none"
            onClick={_isOpen ? closeMenu : openMenu}
            aria-expanded={_isOpen}
            aria-label="Toggle mobile menu"
          >
            <span className="block h-[2px] w-6 bg-black" />
            <span className="block h-[2px] w-4 bg-black" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={overlayRef} 
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1B1B1B',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          visibility: 'hidden',
        }}
      >
        {/* Header row dalam overlay */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" onClick={closeMenu} className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2 text-[#FAFAFA]">
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
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#FAFAFA"/>
                  <rect x="10" y="10" width="12" height="12" fill="#1B1B1B"/>
                </svg>
                <span className="mt-1">{siteName || 'Raclebit'}</span>
              </>
            )}
          </Link>
          <button 
            onClick={closeMenu}
            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
          >
            <span className="absolute w-6 h-[2px] bg-[#FAFAFA] rotate-45" /> 
            <span className="absolute w-6 h-[2px] bg-[#FAFAFA] -rotate-45" />
          </button>
        </div>

        {/* Nav items — vertical centered */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
          {links.map((item, i) => (
            <div 
              key={item.href} 
              ref={el => { itemRefs.current[i] = el }}
              style={{ overflow: 'hidden', borderBottom: '1px solid rgba(250,250,250,0.08)' }}
            >
              <Link 
                href={item.href} 
                onClick={(e) => {
                  e.preventDefault()
                  closeMenu()
                  setTimeout(() => window.location.href = item.href, 500)
                }}
                onMouseEnter={handleItemEnter}
                onMouseLeave={handleItemLeave}
                style={{ 
                  display: 'block', 
                  padding: '20px 0',
                  fontFamily: 'var(--font-instrument-sans)', 
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  color: '#FAFAFA', 
                  lineHeight: 1, 
                  transform: 'translateY(100%)',
                  opacity: pathname === item.href ? 1 : 0.8
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <div 
            ref={el => { itemRefs.current[links.length] = el }}
            style={{ overflow: 'hidden', borderBottom: '1px solid rgba(250,250,250,0.08)' }}
          >
            <Link 
              href="/contact" 
              onClick={(e) => {
                e.preventDefault()
                closeMenu()
                setTimeout(() => window.location.href = '/contact', 500)
              }}
              onMouseEnter={handleItemEnter}
              onMouseLeave={handleItemLeave}
              style={{ 
                display: 'block', 
                padding: '20px 0',
                fontFamily: 'var(--font-instrument-sans)', 
                fontSize: 'clamp(32px, 5vw, 52px)',
                color: '#FAFAFA', 
                lineHeight: 1, 
                transform: 'translateY(100%)',
                opacity: pathname === '/contact' ? 1 : 0.8
              }}
            >
              Start a Conversation
            </Link>
          </div>
        </nav>

        {/* Footer dalam overlay */}
        <div 
          ref={footerInfoRef}
          style={{ paddingTop: '32px', borderTop: '1px solid rgba(250,250,250,0.1)', opacity: 0, transform: 'translateY(20px)' }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(250,250,250,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            contact@raclebit.com
          </p>
        </div>
      </div>
    </>
  )
}