import React from 'react'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { ContactAnimations } from '@/components/sections/contact/ContactAnimations'

export const metadata = {
  title: 'Contact',
  description: 'Start a conversation with Raclebit. Tell us about your project.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <ContactAnimations />
      {/* HERO SECTION */}
      <section className="bg-[#FAFAFA] pt-40 pb-20 px-8 lg:px-16 w-full">
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#1B1B1B]/40 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          Get In Touch — 03
        </p>
        
        {/* Headline */}
        <h1 className="text-[clamp(48px,7vw,100px)] font-heading leading-[0.92] tracking-tight text-[#1B1B1B]">
          <span className="block animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>Let's Build</span>
          <span className="block text-[#1B1B1B]/20 italic animate-fade-in-up" style={{ animationDelay: '0.42s', animationFillMode: 'both' }}>Something</span>
          <span className="block animate-fade-in-up" style={{ animationDelay: '0.54s', animationFillMode: 'both' }}>That Lasts.</span>
        </h1>
        
        {/* Divider */}
        <div className="w-full h-px bg-[#E0E0E0] mt-16 origin-left animate-scale-x" style={{ animationDelay: '0.7s', animationFillMode: 'both' }} />
      </section>

      {/* SPLIT SECTION */}
      <section className="flex flex-col lg:flex-row flex-1">
        {/* KIRI — Form (putih, lebih lebar) */}
        <div className="flex-[3] bg-[#FAFAFA] p-8 lg:p-16">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-heading font-semibold mb-2 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>Start a Conversation</h2>
            <p className="text-sm text-[#1B1B1B]/50 mb-12 font-sans animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              Tell us about your project. We'll get back within 24 hours.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* KANAN — Info Kontak (hitam, lebih sempit) */}
        <div className="flex-[2] bg-[#1B1B1B] text-[#FAFAFA] p-8 lg:p-16 flex flex-col justify-between min-h-[80vh] lg:min-h-0">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#FAFAFA]/40 mb-12 font-sans font-medium">
              Contact Information
            </h3>

            {/* Items */}
            <div className="flex flex-col gap-10 font-sans">
              <div className="contact-info-item">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAFAFA]/35 mb-2 font-medium">Email</p>
                <a href="mailto:contact@raclebit.com" className="text-lg text-[#FAFAFA] hover:opacity-70 transition-opacity">
                  contact@raclebit.com
                </a>
              </div>
              <div className="contact-info-item">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAFAFA]/35 mb-2 font-medium">Phone</p>
                <a href="tel:+6287856655558" className="text-lg text-[#FAFAFA] hover:opacity-70 transition-opacity">
                  +62 878 5665 5558
                </a>
              </div>
              <div className="contact-info-item">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAFAFA]/35 mb-2 font-medium">Social</p>
                <a href="https://instagram.com/raclebit" target="_blank" rel="noopener noreferrer" className="text-lg text-[#FAFAFA] hover:opacity-70 transition-opacity">
                  @raclebit
                </a>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="mt-16 pt-10 border-t border-[#FAFAFA]/10 availability-indicator">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <p className="text-[13px] text-[#FAFAFA]/50 font-sans">
                Available for new projects
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}