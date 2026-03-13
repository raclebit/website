'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export type RevealType =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleUp'
  | 'clipTop'
  | 'clipBottom'
  | 'blurUp'
  | 'rotateUp'
  | 'stagger'
  | 'splitWords'
  | 'splitChars'
  | 'countUp'
  | 'lineGrow'
  | 'parallax'

interface RevealOptions {
  delay?: number
  duration?: number
  stagger?: number
  scrub?: boolean | number
  start?: string
  end?: string
  targetValue?: number // for countUp
}

export function useScrollReveal<T extends HTMLElement = any>(type: RevealType, options: RevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && type !== 'countUp') {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0)', clipPath: 'none', rotationX: 0, rotationY: 0 })
      return
    }

    const {
      delay = 0,
      duration = 0.75,
      stagger = 0.1,
      start = 'top 88%',
      end = 'bottom 20%',
      scrub = false,
      targetValue = 100
    } = options

    const ctx = gsap.context(() => {
      let tween: gsap.core.Tween | gsap.core.Timeline | undefined

      const scrollTriggerObj = {
        trigger: el,
        start,
        end,
        scrub,
        once: !scrub, // Instead of toggleActions, run only once unless it's a scrub animation
      }

      switch (type) {
        case 'fadeUp':
          tween = gsap.fromTo(el, 
            { y: 60, opacity: 0 }, 
            { y: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'fadeDown':
          tween = gsap.fromTo(el, 
            { y: -60, opacity: 0 }, 
            { y: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'fadeLeft':
          tween = gsap.fromTo(el, 
            { x: -60, opacity: 0 }, 
            { x: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'fadeRight':
          tween = gsap.fromTo(el, 
            { x: 60, opacity: 0 }, 
            { x: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'scaleUp':
          tween = gsap.fromTo(el, 
            { scale: 0.88, opacity: 0 }, 
            { scale: 1, opacity: 1, duration, delay, ease: 'back.out(1.7, 0.3)', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'clipTop':
          tween = gsap.fromTo(el,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: duration || 1.2, delay, ease: 'power4.inOut', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'clipBottom':
          tween = gsap.fromTo(el,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: duration || 1.2, delay, ease: 'power4.inOut', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'blurUp':
          tween = gsap.fromTo(el,
            { y: 30, filter: 'blur(12px)', opacity: 0 },
            { y: 0, filter: 'blur(0px)', opacity: 1, duration, delay, ease: 'power2.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'rotateUp':
          tween = gsap.fromTo(el,
            { rotationX: 60, y: 40, opacity: 0, transformOrigin: 'bottom center' },
            { rotationX: 0, y: 0, opacity: 1, duration, delay, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'stagger':
          const children = el.children
          tween = gsap.fromTo(children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration, delay, stagger, ease: 'power3.out', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'lineGrow':
          tween = gsap.fromTo(el,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration, delay, ease: 'none', scrollTrigger: scrollTriggerObj }
          )
          break
        case 'parallax':
          tween = gsap.fromTo(el,
            { y: -20 },
            { y: 20, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
          )
          break
        case 'countUp':
          // Counter animation
          const obj = { val: 0 }
          tween = gsap.to(obj, {
            val: targetValue,
            duration: 1.5,
            delay,
            ease: 'power2.out',
            scrollTrigger: scrollTriggerObj,
            onUpdate: () => {
              if (el) {
                // Formatting to keep '0' prefix if target is small, otherwise just integer
                el.innerText = targetValue < 10 ? `0${Math.round(obj.val)}` : Math.round(obj.val).toString()
              }
            }
          })
          break
        case 'splitWords':
        case 'splitChars':
          // We rely on standard text for now if the element just has text, wrapped dynamically
          // To do this right without GSAP SplitText plugin (which is premium), we manually wrap in a separate component
          // For the hook, we will just apply a fadeUp on the entire element as a fallback if not manually split.
          const parts = el.querySelectorAll('.split-item')
          if(parts.length) {
            tween = gsap.fromTo(parts,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration, delay, stagger: type === 'splitChars' ? 0.025 : 0.05, ease: 'power4.out', scrollTrigger: scrollTriggerObj }
            )
          } else {
            tween = gsap.fromTo(el,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration, delay, ease: 'power4.out', scrollTrigger: scrollTriggerObj }
            )
          }
          break
      }
    }, el)

    return () => ctx.revert()
  }, [type, options])

  return ref
}