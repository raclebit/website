'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => setIsOpen(prev => !prev)

  const selectOption = (option: SelectOption) => {
    onChange(option.value)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = options.find(opt => opt.value === value)?.label

  return (
    <div className="relative group" ref={containerRef}>
      {label && (
        <label className="absolute left-0 -top-5 text-[10px] uppercase tracking-widest text-[#1B1B1B]">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        className="w-full bg-transparent border-b border-[#E0E0E0] py-2 text-left flex items-center justify-between text-base text-[#1B1B1B] focus:border-[#1B1B1B] outline-none transition-colors duration-300"
      >
        <span className={!selectedLabel ? "text-[#1B1B1B]/40 text-base" : "text-base font-sans text-[#1B1B1B]"}>
          {selectedLabel || placeholder}
        </span>
        <svg 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          width="16" height="16" viewBox="0 0 16 16"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-[#FAFAFA] border border-[#E0E0E0] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          style={{ backdropFilter: 'none' }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => selectOption(option)}
              className={`
                w-full text-left px-4 py-3.5
                text-sm font-sans
                border-b border-[#F0F0F0] last:border-0
                transition-colors duration-150
                hover:bg-[#1B1B1B] hover:text-[#FAFAFA]
                ${value === option.value
                  ? 'bg-[#1B1B1B] text-[#FAFAFA] font-medium'
                  : 'text-[#1B1B1B]/70'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}