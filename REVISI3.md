# RACLEBIT — Fix Prompt #3

> Baca `.agents/skills/gsap/SKILL.md` sebelum menyentuh kode GSAP apapun.
> Fokus kode dulu, jangan jalankan `pnpm dev` kecuali diminta.

---

## [FIX 1 & 2] — `ScrollTrigger is not defined` di ContactAnimations.tsx

**File:** `src/components/sections/contact/ContactAnimations.tsx`

**Root Cause:**
`ScrollTrigger` dipakai di dalam `useEffect` cleanup function (`return () => { ScrollTrigger.getAll()... }`) tapi plugin tidak di-import atau tidak di-register sebelum digunakan. Di Next.js dengan SSR, GSAP plugin harus di-import secara eksplisit dan di-register menggunakan `gsap.registerPlugin()` di dalam Client Component, bukan di module level.

**Fix — Tiga langkah wajib:**

```
LANGKAH 1 — Pastikan import ScrollTrigger ada di baris paling atas file:

  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  BUKAN:
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'  ← path ini salah untuk Next.js
  import ScrollTrigger from 'gsap/ScrollTrigger'           ← default import salah

LANGKAH 2 — Register plugin di dalam useEffect (BUKAN di module level):

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)   // ← WAJIB ada di dalam useEffect

    // ... semua kode animasi setelah registerPlugin ...

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  KENAPA di dalam useEffect dan bukan di luar?
  Karena Next.js App Router melakukan server-side rendering. Jika gsap.registerPlugin()
  dipanggil di module level (luar useEffect), ia akan dieksekusi di server yang tidak
  memiliki `window` dan akan crash. useEffect hanya berjalan di browser (client-side).

LANGKAH 3 — Jika ada file `src/lib/gsap.ts` yang menghandle registrasi plugin,
  pastikan ia juga register ScrollTrigger:

  // src/lib/gsap.ts
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { SplitText } from 'gsap/SplitText'

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText)
  }

  export { gsap, ScrollTrigger, SplitText }

  Kemudian di ContactAnimations.tsx, import dari lib/gsap.ts:
  import { gsap, ScrollTrigger } from '@/lib/gsap'
  (dan hapus registerPlugin manual karena sudah ada di lib)

VERIFIKASI — Cek semua file komponen animasi lainnya yang mungkin punya masalah sama:
  - src/components/ui/CustomCursor.tsx
  - src/hooks/useScrollReveal.ts
  - src/components/layout/Navbar.tsx
  - src/components/sections/home/Hero.tsx
  - Semua file yang menggunakan ScrollTrigger atau SplitText

  Pastikan semuanya baik import dari '@/lib/gsap' ATAU melakukan registerPlugin
  di dalam useEffect masing-masing.
```

---

## [FIX 3] — Hapus Efek Kaca (Glass/Glossy) pada Tombol di Section CTA dan Card Partnership

**Files yang perlu diubah:**
- Section "Let's Build Systems That Last" → tombol "Start a Conversation"
- Card "Technology Partnership" → tombol "Inquire"
- Cek seluruh codebase untuk tombol lain yang mungkin punya efek serupa

**Masalah:**
Tombol-tombol ini memiliki efek glassmorphism (backdrop-filter, transparan seperti kaca) yang tidak sesuai dengan brand Raclebit yang mengedepankan kejelasan, struktur, dan keterbacaan tinggi. Efek kaca mengurangi kontras dan keterbacaan teks pada tombol.

**Ganti dengan style tombol yang sesuai brand Raclebit:**

```
HAPUS class/style seperti ini dari tombol-tombol tersebut:
  - backdrop-filter: blur(...)
  - background: rgba(255,255,255,0.1) atau rgba(0,0,0,0.1) atau transparan apapun
  - border: 1px solid rgba(255,255,255,0.2) atau semi-transparan
  - box-shadow dengan blur besar seperti efek kaca
  - Semua kombinasi yang menghasilkan tampilan "frosted glass"

GANTI dengan dua varian tombol yang sesuai brand:

--- VARIAN A: Tombol di atas background GELAP (section CTA hitam) ---
  Style dasar:
    background: transparent
    border: 1.5px solid rgba(250,250,250,0.7)
    color: #FAFAFA
    padding: 16px 40px
    font-size: 13px
    font-family: Inter
    font-weight: 500
    letter-spacing: 0.08em
    text-transform: uppercase
    border-radius: 0  ← Raclebit tidak menggunakan border-radius besar
    cursor: none  ← karena ada custom cursor

  Hover effect — INK WIPE (bukan glass):
    Gunakan ::before pseudo-element:
      content: ''
      position: absolute
      inset: 0
      background: #FAFAFA
      transform: scaleX(0)
      transform-origin: left center
      transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)

    Saat hover, ::before berubah ke scaleX(1) → teks berubah warna ke #1B1B1B
    Efeknya: putih "menyapu" tombol dari kiri ke kanan

  Implementasi Tailwind + CSS custom:
    className="relative overflow-hidden border border-white/70 text-white
               px-10 py-4 text-xs uppercase tracking-widest font-medium
               transition-colors duration-350 group"

    Span teks:
    className="relative z-10 transition-colors duration-350 group-hover:text-[#1B1B1B]"

    Div ink-wipe:
    className="absolute inset-0 bg-white scale-x-0 origin-left
               transition-transform duration-350 ease-[cubic-bezier(0.65,0,0.35,1)]
               group-hover:scale-x-100"

--- VARIAN B: Tombol di atas background TERANG / Card putih ---
  Style dasar (kebalikan dari Varian A):
    background: transparent
    border: 1.5px solid rgba(27,27,27,0.7)
    color: #1B1B1B
    padding: 14px 32px
    font-size: 12px
    letter-spacing: 0.08em
    text-transform: uppercase

  Hover effect — INK WIPE gelap:
    ::before background: #1B1B1B
    transform: scaleX(0) → scaleX(1) saat hover
    Teks berubah dari #1B1B1B ke #FAFAFA saat hover

--- TOMBOL KHUSUS: Card "Technology Partnership" (card dark/featured) ---
  Card ini biasanya memiliki background hitam (#1B1B1B).
  Tombol "Inquire" di dalamnya: gunakan VARIAN A (border putih, ink wipe putih).

  Pastikan tidak ada:
    - backdrop-filter apapun pada tombol
    - background semi-transparan
    - shadow besar seperti glow/bloom effect

CARI dan GANTI di semua file komponen:
  Cari: backdrop-filter, glass, glossy, blur pada tombol
  Cari: background dengan opacity rendah seperti bg-white/10, bg-black/10
  Pastikan semua <Button> component, <button> element, dan <Link> yang bergaya tombol
  menggunakan salah satu dari dua varian di atas.
```

---

## [FIX 4] — Style Select Dropdown "Engagement Type" di Contact Form

**File:** `src/components/sections/contact/ContactForm.tsx`

**Masalah yang terlihat di screenshot:**
Ketika dropdown select dibuka, tampilannya adalah native browser dropdown yang sangat flat dan tidak konsisten dengan desain website — warna biru browser default untuk selected item, font tidak sesuai, tidak ada border-radius sesuai desain, padding sempit, dan tidak mengikuti brand Raclebit sama sekali.

**Penyebab:**
Elemen `<select>` HTML native tidak bisa di-style sepenuhnya dengan CSS. Browser memiliki kontrol penuh atas tampilan dropdown-nya (terutama bagian popup/listbox). Solusi terbaik adalah **mengganti `<select>` native dengan custom dropdown component** yang dibangun dari elemen HTML biasa.

**Solusi — Buat CustomSelect component:**

```
Buat file baru: src/components/ui/CustomSelect.tsx

STRUKTUR KOMPONEN:

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

STRUKTUR HTML:
<div className="field-group relative">

  {/* Label floating */}
  <label className="...label style sesuai contact form...">
    ENGAGEMENT TYPE
  </label>

  {/* Trigger button — terlihat seperti input */}
  <button
    type="button"
    onClick={toggleOpen}
    className="w-full bg-transparent border-b border-[#E0E0E0] py-2 text-left
               flex items-center justify-between text-base text-[#1B1B1B]
               focus:border-[#1B1B1B] outline-none transition-colors duration-300"
  >
    <span>{selectedLabel || placeholder}</span>
    {/* Chevron icon yang rotate saat open */}
    <svg className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
         width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  </button>

  {/* Dropdown options panel */}
  {isOpen && (
    <div
      className="absolute top-full left-0 right-0 z-50 mt-1
                 bg-[#FAFAFA] border border-[#E0E0E0]
                 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      style={{ backdropFilter: 'none' }}   // ← TIDAK menggunakan glass effect
    >
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          onClick={() => selectOption(option)}
          className={`
            w-full text-left px-4 py-3.5
            text-sm font-inter
            border-b border-[#F0F0F0] last:border-0
            transition-colors duration-150
            hover:bg-[#1B1B1B] hover:text-[#FAFAFA]
            ${value === option.value
              ? 'bg-[#1B1B1B] text-[#FAFAFA] font-medium'  // ← selected: hitam bukan biru
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

STATE MANAGEMENT:
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(prev => !prev)

  const selectOption = (option: SelectOption) => {
    onChange(option.value)
    setIsOpen(false)
  }

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

ANIMASI DROPDOWN (GSAP atau CSS):
  Saat open:
    opacity: 0 → 1
    y: -8px → 0
    duration: 0.25s, ease: 'power2.out'

  Saat close:
    opacity: 1 → 0
    y: 0 → -8px
    duration: 0.2s

  Option items stagger masuk:
    Setiap option: opacity: 0 → 1, x: -8 → 0
    stagger: 0.04s

DESIGN DETAIL dropdown panel:
  - Background: #FAFAFA (putih bersih, BUKAN transparan/glass)
  - Border: 1px solid #E0E0E0
  - Box-shadow: 0 8px 32px rgba(0,0,0,0.08)  ← shadow subtle, bukan glow
  - Border-radius: 0  ← konsisten dengan brand (tidak rounded)
  - Setiap option: padding 14px 16px
  - Hover state: background #1B1B1B, teks #FAFAFA (ink fill, konsisten dengan brand)
  - Selected state: sama dengan hover — #1B1B1B background, #FAFAFA teks
  - Font: Inter, 13px, letter-spacing normal
  - Lebar: sama dengan trigger (100% dari parent)

GANTI penggunaan di ContactForm.tsx:
  HAPUS: <select name="engagementType" ...><option .../></select>
  GANTI DENGAN: <CustomSelect
                  label="ENGAGEMENT TYPE"
                  options={[
                    { value: 'project-based', label: 'Project-Based Development' },
                    { value: 'partnership', label: 'Technology Partnership (Retainer)' },
                    { value: 'audit', label: 'System Audit & Assessment' },
                    { value: 'other', label: 'Other' },
                  ]}
                  value={engagementType}
                  onChange={setEngagementType}
                  placeholder="Select engagement type"
                />

PASTIKAN nilai dari CustomSelect ikut ter-submit bersama form.
Jika menggunakan controlled form biasa (bukan library form),
simpan di state dan sertakan sebagai hidden input atau dalam data submit.
```

---

## ✅ Checklist Verifikasi

- [ ] Tidak ada error `ScrollTrigger is not defined` di console
- [ ] Semua file GSAP import ScrollTrigger dengan benar dan registerPlugin di dalam useEffect
- [ ] Tombol "Start a Conversation" di CTA section: tidak ada efek glass/glossy
- [ ] Tombol "Inquire" di card Technology Partnership: tidak ada efek glass/glossy
- [ ] Kedua tombol menggunakan ink-wipe hover effect (scaleX 0→1)
- [ ] Dropdown "Engagement Type": tidak menggunakan `<select>` native browser
- [ ] Dropdown custom menggunakan background #FAFAFA solid (bukan transparan)
- [ ] Selected option ditampilkan dengan background #1B1B1B (hitam), bukan biru browser
- [ ] Dropdown menutup saat klik di luar area komponen
- [ ] `pnpm tsc --noEmit` — tidak ada TypeScript error baru
