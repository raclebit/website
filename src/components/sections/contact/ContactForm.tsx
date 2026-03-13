'use client'

import React, { useState } from 'react'
import { CustomSelect } from '@/components/ui/CustomSelect'

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [engagementType, setEngagementType] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1500)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up">
        <div className="w-16 h-16 bg-[#1B1B1B] text-[#FAFAFA] rounded-full flex items-center justify-center mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-instrument-sans text-3xl font-semibold mb-2">Message Sent</h3>
        <p className="font-sans text-[#1B1B1B]/60 text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative group">
          <input 
            type="text" 
            id="name" 
            required 
            placeholder=" "
            className="peer w-full bg-transparent border-b border-[#E0E0E0] py-2 text-base font-sans text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B] transition-colors"
          />
          <label 
            htmlFor="name" 
            className="absolute left-0 top-2 text-[11px] uppercase tracking-widest text-[#1B1B1B]/40 transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:text-[#1B1B1B] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#1B1B1B]"
          >
            Name
          </label>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            id="company" 
            placeholder=" "
            className="peer w-full bg-transparent border-b border-[#E0E0E0] py-2 text-base font-sans text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B] transition-colors"
          />
          <label 
            htmlFor="company" 
            className="absolute left-0 top-2 text-[11px] uppercase tracking-widest text-[#1B1B1B]/40 transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:text-[#1B1B1B] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#1B1B1B]"
          >
            Company (Optional)
          </label>
        </div>
      </div>

      <div className="relative group">
        <input 
          type="email" 
          id="email" 
          required 
          placeholder=" "
          className="peer w-full bg-transparent border-b border-[#E0E0E0] py-2 text-base font-sans text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B] transition-colors"
        />
        <label 
          htmlFor="email" 
          className="absolute left-0 top-2 text-[11px] uppercase tracking-widest text-[#1B1B1B]/40 transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:text-[#1B1B1B] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#1B1B1B]"
        >
          Email Address
        </label>
      </div>

      <div className="relative group mt-6">
        <CustomSelect
          label="ENGAGEMENT TYPE"
          options={[
            { value: 'project', label: 'Project-Based Development' },
            { value: 'partnership', label: 'Technology Partnership (Retainer)' },
            { value: 'audit', label: 'System Audit & Assessment' },
            { value: 'other', label: 'Other' },
          ]}
          value={engagementType}
          onChange={setEngagementType}
          placeholder="Select engagement type"
        />
        {/* Hidden input for form submission if needed */}
        <input type="hidden" name="engagement" value={engagementType} required />
      </div>

      <div className="relative group mt-2">
        <textarea 
          id="message" 
          required 
          rows={4}
          placeholder=" "
          className="peer w-full bg-transparent border-b border-[#E0E0E0] py-2 text-base font-sans text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B] transition-colors resize-none"
        />
        <label 
          htmlFor="message" 
          className="absolute left-0 top-2 text-[11px] uppercase tracking-widest text-[#1B1B1B]/40 transition-all duration-200 peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:text-[#1B1B1B] peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#1B1B1B]"
        >
          Message / Project Details
        </label>
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'} 
        className="w-full relative overflow-hidden bg-[#1B1B1B] text-[#FAFAFA] py-4 px-8 font-sans text-sm uppercase tracking-widest font-medium disabled:opacity-70 group"
      >
        <span className="absolute inset-0 w-full h-full bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        <span className="relative z-10">
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </span>
      </button>
    </form>
  )
}