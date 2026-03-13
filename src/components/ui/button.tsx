'use client'

import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, ...props }, ref) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-350 overflow-hidden group cursor-none z-10 rounded-none'
    
    // For outline variant ink wipe effect, we use ::before pseudo element
    const variants = {
      primary: 'bg-transparent border-[1.5px] border-[#1B1B1B]/70 text-[#1B1B1B] px-8 py-3.5 text-xs before:absolute before:inset-0 before:w-full before:h-full before:bg-[#1B1B1B] before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-350 before:ease-[cubic-bezier(0.65,0,0.35,1)] before:-z-10 hover:text-[#FAFAFA]',
      outline: 'bg-transparent border-[1.5px] border-[#FAFAFA]/70 text-[#FAFAFA] px-10 py-4 text-[13px] before:absolute before:inset-0 before:w-full before:h-full before:bg-[#FAFAFA] before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-350 before:ease-[cubic-bezier(0.65,0,0.35,1)] before:-z-10 hover:text-[#1B1B1B]',
      dark: 'bg-[#1B1B1B] border-[1.5px] border-[#1B1B1B] text-[#FAFAFA] px-8 py-3.5 text-xs before:absolute before:inset-0 before:w-full before:h-full before:bg-[#FAFAFA] before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-350 before:ease-[cubic-bezier(0.65,0,0.35,1)] before:-z-10 hover:text-[#1B1B1B]',
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'