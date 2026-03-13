'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // Posisi mouse realtime
    let mouseX = -100
    let mouseY = -100

    // Set posisi awal jauh dari viewport
    gsap.set(outer, { x: -100, y: -100, xPercent: -50, yPercent: -50 })
    gsap.set(inner, { x: -100, y: -100, xPercent: -50, yPercent: -50 })

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Inner dot: ikut langsung (no delay)
      gsap.to(inner, {
        x: mouseX,
        y: mouseY,
        duration: 0,   // <- realtime, tidak ada lag
      })

      // Outer ring: ada lag/delay
      gsap.to(outer, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,   // <- delay di sini — semakin besar = semakin lambat
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Hover effect pada interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [role="button"], input, select, textarea')

    const onHoverIn = () => {
      gsap.to(outer, {
        width: 56,
        height: 56,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(inner, {
        scale: 0.5,
        duration: 0.3,
      })
    }

    const onHoverOut = () => {
      gsap.to(outer, {
        width: 32,
        height: 32,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(inner, {
        scale: 1,
        duration: 0.3,
      })
    }

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    // Click effect: squish
    const onMouseDown = () => {
      gsap.to(outer, { scale: 0.75, duration: 0.1 })
    }
    const onMouseUp = () => {
      gsap.to(outer, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' })
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Mutation observer for dynamically added elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach(el => {
        // remove first to avoid duplicates
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
      observer.disconnect()
    }
  }, [])

  // Hide on touch devices via CSS
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (pointer: coarse) {
            .custom-cursor-el { display: none !important; }
          }
        `
      }} />
      
      {/* Outer ring — delayed */}
      <div
        ref={outerRef}
        className="custom-cursor-el"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid currentColor',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — realtime */}
      <div
        ref={innerRef}
        className="custom-cursor-el"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  )
}