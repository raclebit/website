'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export const ContactAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // ON SCROLL (untuk elemen di bawah fold)
    // Contact info items
    const infoItems = document.querySelectorAll('.contact-info-item')
    gsap.fromTo(infoItems,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info-item',
          start: 'top 80%',
          once: true,
        }
      }
    )

    // Availability indicator
    const availability = document.querySelector('.availability-indicator')
    gsap.fromTo(availability,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3, // after info items
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.availability-indicator',
          start: 'top 90%',
          once: true,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return null
}