# RACLEBIT — Revisi Prompt #2

> **PENTING:** Baca `.agents/skills/gsap/SKILL.md` dan `.agents/skills/frontend-design/SKILL.md` sebelum menulis kode apapun.
> Fokus kode dulu, jangan jalankan `pnpm dev` kecuali diminta.

---

## [FIX 1] — Navbar Hide/Show Rusak Setelah Klik Menu (Navigation)

**File:** `src/components/layout/Navbar.tsx`

**Root Cause:**
ScrollTrigger yang mengontrol hide/show navbar di-setup sekali pada `useEffect` mount awal. Ketika user klik link navigasi, Next.js melakukan client-side navigation yang me-unmount dan re-mount komponen, atau ScrollTrigger kehilangan scroll context-nya. Akibatnya listener scroll direction tidak berjalan lagi dan navbar menjadi `fixed` permanen.

**Fix:**

```
1. Pastikan ScrollTrigger di-refresh setiap kali route berubah.
   Gunakan `usePathname()` dari next/navigation sebagai dependency useEffect:

   import { usePathname } from 'next/navigation'
   const pathname = usePathname()

   useEffect(() => {
     // Semua setup ScrollTrigger navbar di sini
     return () => {
       ScrollTrigger.getAll().forEach(t => t.kill())
     }
   }, [pathname])  // ← re-run setiap kali route berubah

2. Ganti pendekatan hide/show dari ScrollTrigger murni ke kombinasi
   event listener + GSAP untuk lebih reliable:

   let lastScrollY = 0
   let ticking = false

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
   }

3. Pastikan navbar SELALU visible (yPercent: 0) saat pertama kali load
   dan setiap kali pathname berubah:

   useEffect(() => {
     gsap.set(navRef.current, { yPercent: 0 })  // ← reset posisi
     lastScrollY = 0  // ← reset scroll tracker
   }, [pathname])

4. Pastikan navbar tidak punya CSS `transform` atau `transition` yang
   konflik dengan GSAP — hapus semua CSS transition pada elemen navbar.
```

---

## [FIX 2] — Halaman Contact Terlalu Gelap & Belum Ada Animasi

**File:** `src/app/(frontend)/contact/page.tsx` dan komponen terkait

**Masalah:** Background dark mendominasi seluruh halaman, terasa berat dan tidak seimbang.

**Perbaikan Layout — Ubah proporsi:**

```
SEBELUM: Hero full dark + split (40% dark | 60% white)
SESUDAH: Hero section lebih ramping + split dibalik (60% white form | 40% dark info)

STRUKTUR BARU:

<main>

  {/* HERO — lebih kecil, tidak full height */}
  <section style="background: #FAFAFA; padding-top: 160px; padding-bottom: 80px;">
    {/* Label kecil */}
    <p class="text-xs uppercase tracking-[0.3em] text-[#1B1B1B]/40 mb-4">
      Get In Touch — 03
    </p>
    {/* Headline: hitam di atas putih */}
    <h1 style="color: #1B1B1B; font-size: clamp(48px,7vw,100px); line-height: 0.92;">
      Let's Build<br/>
      <span style="color: rgba(27,27,27,0.2);">Something</span><br/>
      That Lasts.
    </h1>
    {/* Thin divider */}
    <div style="width: 100%; height: 1px; background: #E0E0E0; margin-top: 64px;" />
  </section>

  {/* SPLIT SECTION — form lebih dominan */}
  <section style="display: flex; min-height: 80vh;">

    {/* KIRI — Form (putih, lebih lebar) */}
    <div style="flex: 3; background: #FAFAFA; padding: 80px;">
      <h2>Start a Conversation</h2>
      <p style="color: rgba(27,27,27,0.5);">
        Tell us about your project. We'll get back within 24 hours.
      </p>
      <ContactForm />
    </div>

    {/* KANAN — Info Kontak (hitam, lebih sempit) */}
    <div style="flex: 2; background: #1B1B1B; color: #FAFAFA; padding: 80px;
                display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;
                   color: rgba(250,250,250,0.4); margin-bottom: 48px;">
          Contact Information
        </h3>

        {/* Items */}
        <div style="display: flex; flex-direction: column; gap: 40px;">
          <div>
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em;
                      color: rgba(250,250,250,0.35); margin-bottom: 8px;">Email</p>
            <a href="mailto:contact@raclebit.com"
               style="font-size: 18px; color: #FAFAFA;">
              contact@raclebit.com
            </a>
          </div>
          <div>
            <p style="... same label style ...">Phone</p>
            <a href="tel:+6287856655558" style="font-size: 18px; color: #FAFAFA;">
              +62 878 5665 5558
            </a>
          </div>
          <div>
            <p style="... same label style ...">Social</p>
            <a href="https://instagram.com/raclebit" style="font-size: 18px; color: #FAFAFA;">
              @raclebit
            </a>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div style="padding-top: 40px; border-top: 1px solid rgba(250,250,250,0.1);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="width: 8px; height: 8px; border-radius: 50%;
                       background: #4ade80;" class="animate-pulse" />
          <p style="font-size: 13px; color: rgba(250,250,250,0.5);">
            Available for new projects
          </p>
        </div>
      </div>
    </div>

  </section>

</main>

MOBILE: stack vertikal — form di atas, info di bawah.
Pada mobile, info section height: auto (tidak min-height).
```

**Animasi onLoad dan onScroll untuk Contact Page:**

```
Tambahkan Client Component wrapper atau gunakan useEffect di ContactPage:

ON LOAD (saat halaman pertama kali muncul):
1. Hero label "GET IN TOUCH — 03"
   → fadeUp: y: 20 → 0, opacity: 0 → 1, duration: 0.6, delay: 0.1

2. Hero headline — SplitText per LINE (bukan per char, karena besar):
   → Setiap baris: y: 60 → 0, opacity: 0 → 1
   → stagger: 0.12s per baris
   → duration: 0.8s, ease: 'power3.out'
   → delay awal: 0.3s

3. Divider line bawah hero:
   → scaleX: 0 → 1 (dari kiri ke kanan)
   → duration: 0.8s, ease: 'power2.inOut'
   → delay: 0.7s
   → transform-origin: left center

4. Form title dan subtitle:
   → fadeUp, delay: 0.5s

5. Form fields stagger:
   → Setiap .field-group: y: 30 → 0, opacity: 0 → 1
   → stagger: 0.08s per field
   → delay: 0.6s

6. Submit button:
   → scaleX: 0.9 → 1, opacity: 0 → 1
   → delay: 1.2s

ON SCROLL (untuk elemen di bawah fold):
7. Contact info kanan — setiap item (email, phone, social):
   → fadeUp stagger: y: 40 → 0, opacity: 0 → 1
   → stagger: 0.15s per item
   → ScrollTrigger start: "top 80%"

8. Availability indicator:
   → fadeUp, delay setelah items
   → Dot pulse: CSS animation `animate-pulse` dari Tailwind
```

---

## [FIX 3] — Scroll Reveal Semua Elemen di Semua Halaman

**Context:** Terapkan GSAP ScrollTrigger reveal yang bervariasi di setiap halaman.
**READ `.agents/skills/gsap/SKILL.md` dulu sebelum implementasi.**

**Buat utility hook `src/hooks/useScrollReveal.ts`:**

```typescript
// Tipe reveal yang tersedia:
type RevealType =
  | 'fadeUp'      // y: 60→0, opacity: 0→1  (paling umum)
  | 'fadeLeft'    // x: -60→0, opacity: 0→1
  | 'fadeRight'   // x: 60→0, opacity: 0→1
  | 'scaleUp'     // scale: 0.88→1, opacity: 0→1
  | 'clipTop'     // clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)  (reveal dari atas)
  | 'clipBottom'  // clipPath: inset(100% 0 0 0) → inset(0% 0 0 0)  (reveal dari bawah)
  | 'blurUp'      // y: 30→0, filter: blur(12px)→blur(0), opacity: 0→1
  | 'rotateUp'    // rotationX: 60→0, y: 40→0, opacity: 0→1 (perspektif 3D)
  | 'stagger'     // children animated dengan stagger 0.1s
  | 'splitWords'  // SplitText per word, stagger 0.05s
  | 'splitChars'  // SplitText per char, stagger 0.025s
  | 'countUp'     // angka count up dari 0 ke nilai target (untuk metrics)
  | 'lineGrow'    // scaleX: 0→1 (untuk divider lines)
  | 'parallax'    // y bergerak lambat saat scroll (depth effect)

// Default ScrollTrigger options:
start: 'top 88%'
toggleActions: 'play none none reverse'
duration: 0.75
ease: 'power3.out'
```

**Mapping animasi per halaman — WAJIB DIIKUTI:**

```
=== HOME PAGE ===
· Navbar initial load        → stagger fadeDown (nav items satu per satu)
· Hero headline              → splitChars (y: 100→0, stagger: 0.02)
· Hero subtext               → splitWords (delay: 0.6s)
· Hero CTA buttons           → stagger fadeUp (delay: 1s)
· Hero decorative number     → fadeRight, opacity sangat rendah (0→0.06)
· Marquee                    → tidak perlu reveal (auto-play infinite)
· "What We Do" label         → fadeLeft
· "What We Do" heading       → splitWords
· Feature cards (3 buah)     → stagger scaleUp (0.12s antar card)
· Card number "01/02/03"     → countUp (0 → angkanya, duration: 1.5s)
· "Selected Work" heading    → clipBottom
· Case study cards           → stagger fadeUp + parallax pada image
· Case study card image      → parallax (y: -20 → 20 saat scroll)
· "How We Work" label        → fadeLeft
· "How We Work" heading      → splitWords
· Process steps (5 buah)     → stagger fadeUp (0.18s delay antar step)
· SVG connector line         → lineGrow (scaleX: 0→1 scrub: true)
· Step numbers               → countUp
· Engagement Models heading  → clipBottom
· Model cards (3 buah)       → stagger rotateUp (0.15s antar card)
· "Our Thinking" heading     → splitWords
· Blog preview cards         → stagger blurUp
· CTA section heading        → splitChars (dramatis, besar)
· CTA button                 → scaleUp (delay: 0.8s setelah heading)
· Footer content             → stagger fadeUp per kolom

=== ABOUT PAGE ===
· Hero label                 → fadeLeft
· Hero headline baris 1      → clipBottom
· Hero headline baris 2      → clipBottom (delay: 0.15s)
· Hero headline baris 3      → clipBottom (delay: 0.3s)
· Hero subtext paragraph     → fadeUp (delay: 0.5s)
· Philosophy section         → seluruh section bg slide dari kanan (clipLeft)
· Philosophy quote text      → splitWords (besar, dramatis)
· Philosophy supporting text → fadeUp
· Vision heading             → splitChars
· Vision body                → fadeRight
· Mission heading            → splitChars
· Mission body               → fadeLeft
· Values label               → fadeLeft
· Values heading             → splitWords
· Values cards (4 buah)      → stagger scaleUp (0.1s)
· Values card icon           → rotateUp (rotationY: 90→0)
· Process steps              → stagger fadeUp

=== SOLUTIONS PAGE ===
· Hero label + heading       → splitChars
· Engagement Models cards    → stagger rotateUp
· Feature list dalam card    → stagger fadeLeft (kecil, 0.06s)
· Industries label           → fadeLeft
· Industries heading         → splitWords
· Industry items (grid)      → stagger blurUp
· Core Focus heading         → clipBottom
· Core focus list items      → stagger fadeLeft (0.12s, dengan counter)
· CTA                        → scaleUp

=== CASE STUDIES PAGE ===
· Hero label + heading       → splitChars
· Filter buttons             → stagger fadeDown
· Case study cards grid      → stagger fadeUp (0.1s)
· Card cover image           → scaleUp dari 1.05→1 pada reveal
· Card result metric         → countUp (jika ada angka)

=== INDIVIDUAL CASE STUDY ===
· Hero image                 → clipBottom (reveal lambat, duration: 1.2s)
· Industry tag               → fadeLeft
· Headline                   → splitWords
· "Problem" label            → fadeLeft
· Problem content            → fadeUp
· "Solution" label           → fadeLeft
· Solution content           → fadeUp
· "Result" label             → fadeLeft
· Result metric besar        → countUp
· Result content             → fadeUp
· Tech tags                  → stagger fadeUp (kecil, 0.06s)
· Related case studies       → stagger scaleUp

=== BLOG PAGE ===
· Hero heading               → splitChars
· Category filter            → stagger fadeDown
· Blog cards                 → stagger blurUp (0.12s antar card)
· Card image                 → parallax (y: -15 → 15)

=== INDIVIDUAL BLOG POST ===
· Reading progress bar       → scaleX driven by scroll progress (scrub: true)
· Hero image                 → clipBottom
· Category + date            → fadeLeft
· Post title                 → splitWords
· Article paragraphs         → fadeUp (subtle, y: 20→0, threshold rendah)
· In-article images          → scaleUp (scale: 0.96→1)
· Author section             → fadeUp

=== CONTACT PAGE ===
→ Sudah dijelaskan detail di FIX 2 di atas

ATURAN GLOBAL:
· Semua ScrollTrigger: start "top 88%", toggleActions "play none none reverse"
· Semua animasi: cek prefers-reduced-motion, skip jika true
· Cleanup: ScrollTrigger.getAll().forEach(t => t.kill()) di return useEffect
· Gunakan gsap.context() untuk scoping agar tidak ada memory leak
· Untuk elemen yang di-render dari server (async), gunakan ScrollTrigger.refresh()
  setelah data selesai di-mount
```

---

## [FIX 4] — Hamburger Menu — Animasi Slide Per Menu Item

**File:** `src/components/layout/Navbar.tsx` (bagian mobile menu)

**Perbaikan tampilan dan animasi:**

```
STRUKTUR MOBILE MENU OVERLAY:

<div ref={overlayRef} style="
  position: fixed;
  inset: 0;
  background: #1B1B1B;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 32px;
  transform: translateY(-100%);  /* ← hidden di atas layar */
">
  {/* Header row dalam overlay */}
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <Logo variant="white" />
    <button onClick={closeMenu}>  {/* X button */}
      <span /> <span />  {/* dua garis membentuk X */}
    </button>
  </div>

  {/* Nav items — vertical centered */}
  <nav style="flex: 1; display: flex; flex-direction: column;
               justify-content: center; gap: 8px; margin-top: 48px;">
    {navItems.map((item, i) => (
      <div key={item.href} ref={el => itemRefs.current[i] = el}
           style="overflow: hidden; border-bottom: 1px solid rgba(250,250,250,0.08);">
        <Link href={item.href} onClick={closeMenu}
              style="display: block; padding: 20px 0;
                     font-family: 'Instrument Sans'; font-size: clamp(32px, 5vw, 52px);
                     color: #FAFAFA; line-height: 1; transform: translateY(100%);">
          {item.label}
        </Link>
      </div>
    ))}
  </nav>

  {/* Footer dalam overlay — contact info kecil */}
  <div style="padding-top: 32px; border-top: 1px solid rgba(250,250,250,0.1);">
    <p style="font-size: 12px; color: rgba(250,250,250,0.4); letter-spacing: 0.1em;">
      contact@raclebit.com
    </p>
  </div>
</div>

ANIMASI GSAP — Open Menu:
const openMenu = () => {
  const tl = gsap.timeline()

  // 1. Overlay slide turun dari atas
  tl.to(overlayRef.current, {
    yPercent: 0,        // dari -100% → 0
    duration: 0.55,
    ease: 'power4.inOut',
  })

  // 2. Setiap menu item slide masuk dari bawah (overflow hidden = terlihat wipe up)
  tl.to(itemRefs.current.map(el => el?.querySelector('a')), {
    y: 0,              // dari translateY(100%) → 0
    duration: 0.55,
    stagger: 0.07,     // ← slide giliran per item, 70ms jeda
    ease: 'power3.out',
  }, '-=0.3')          // mulai sebelum overlay selesai

  // 3. Footer info fade in
  tl.to(footerInfoRef.current, {
    opacity: 1,
    y: 0,
    duration: 0.4,
  }, '-=0.2')
}

ANIMASI GSAP — Close Menu:
const closeMenu = () => {
  const tl = gsap.timeline({
    onComplete: () => setIsOpen(false)
  })

  // 1. Items slide keluar ke bawah (reverse stagger — dari bawah ke atas)
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

HAMBURGER BUTTON ANIMATION (tiga garis → X):
Gunakan dua span untuk membentuk X:
- Garis 1: rotate(0deg) → rotate(45deg), translateY(0) → translateY(Npx)
- Garis 2: rotate(0deg) → rotate(-45deg), translateY(0) → translateY(-Npx)
- Kalau ada garis ketiga: opacity 1 → 0

gsap.to(line1Ref.current, { rotation: 45, y: 8, duration: 0.3 })
gsap.to(line2Ref.current, { rotation: -45, y: -8, duration: 0.3 })

HOVER EFFECT pada setiap menu item di overlay:
- Hover in: item sedikit geser kanan (x: 0 → 12px) + opacity 0.6
- Hover out: kembali normal
- Gunakan GSAP mouseenter/mouseleave, bukan CSS transition

Active route highlight:
- Item yang sesuai pathname: color #FAFAFA, opacity full
- Item lain saat satu di-hover: opacity 0.35 (dimmer)
```

---

## [FIX 5] — Custom Cursor: Delay + Cursor Asli Tetap Ada + Mix-Blend-Mode

**File:** `src/components/ui/CustomCursor.tsx`

**Masalah:**
1. Tidak ada delay/lag (mengikuti cursor secara realtime)
2. Cursor asli browser dihilangkan — harus tetap ada
3. Bulatan gelap tidak terlihat di background gelap

**Fix lengkap:**

```typescript
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
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
        duration: 0,   // ← realtime, tidak ada lag
      })

      // Outer ring: ada lag/delay
      gsap.to(outer, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,   // ← delay di sini — semakin besar = semakin lambat
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Hover effect pada interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [role="button"]')

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

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [])

  return (
    <>
      {/* Outer ring — delayed */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid currentColor',   // ← inherit warna dari mix-blend-mode
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',            // ← KUNCI: invert warna background
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — realtime */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: 'white',             // ← putih, karena mix-blend-mode difference
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

PENTING — CSS untuk cursor:
Di globals.css, JANGAN gunakan `cursor: none` secara global.
Gunakan class khusus yang hanya aktif di desktop:

@media (pointer: fine) {
  /* Hanya tambahkan custom cursor style di sini, JANGAN hide cursor asli */
  /* Cursor asli tetap ada — kita hanya menambahkan element tambahan di atasnya */
}

PENJELASAN mix-blend-mode: difference:
- Ketika bulatan berada di atas background PUTIH → bulatan terlihat HITAM
- Ketika bulatan berada di atas background HITAM → bulatan terlihat PUTIH
- Otomatis kontras di semua kondisi tanpa perlu cek background secara manual
- Ini adalah solusi standar industri untuk custom cursor
- Warna elemen cursor harus WHITE agar mix-blend-mode difference bekerja dengan benar
  (white - background_color = inverted color)

CATATAN TAMBAHAN:
- `border: 1.5px solid currentColor` pada outer ring — currentColor akan mengikuti
  mix-blend-mode sehingga selalu kontras
- Atau ganti dengan: `border: 1.5px solid white` + `mixBlendMode: 'difference'`
- Sembunyikan hanya di touchscreen: @media (pointer: coarse) { display: none }
  JANGAN sembunyikan di desktop mouse (pointer: fine)
```

---

## ✅ Checklist Verifikasi Setelah Semua Fix

- [ ] Navbar hide/show berjalan normal setelah klik link navigasi (bukan hanya pertama kali)
- [ ] Navbar reset ke posisi visible setiap kali pathname berubah
- [ ] Halaman Contact: background putih lebih dominan dari hitam
- [ ] Contact page: animasi onload hero headline muncul (SplitText)
- [ ] Contact page: animasi onscroll untuk info kontak dan form fields
- [ ] Scroll reveal berjalan di semua section semua halaman
- [ ] Animasi bervariasi (bukan semuanya fadeUp yang sama)
- [ ] Hamburger menu: overlay slide dari atas, items slide masuk satu per satu
- [ ] Hamburger close: items slide keluar, overlay naik ke atas
- [ ] Cursor asli browser TETAP TERLIHAT (tidak dihilangkan)
- [ ] Custom cursor ring ada delay/lag saat digerakkan
- [ ] Custom cursor terlihat jelas di background gelap maupun terang (mix-blend-mode: difference)
- [ ] `pnpm tsc --noEmit` — tidak ada error TypeScript
- [ ] `prefers-reduced-motion` dihormati di semua animasi
