'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  el?: keyof React.JSX.IntrinsicElements | React.ElementType
  delay?: number
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className, 
  el: Wrapper = 'div',
  delay = 0 
}) => {
  const containerRef = useRef<any>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current) return
    
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(containerRef.current.querySelectorAll('.char'), { y: 0, opacity: 1 })
      return
    }

    const chars = containerRef.current.querySelectorAll('.char')
    
    gsap.fromTo(chars, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [delay])

  // Simple split characters logic
  const words = text.split(' ')

  return (
    <Wrapper ref={containerRef} className={cn('overflow-hidden flex flex-wrap gap-x-[0.25em]', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <span 
              key={`${wordIndex}-${charIndex}`} 
              className="char inline-block"
              style={{ opacity: 0, transform: 'translateY(100px)' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Wrapper>
  )
}