# RACLEBIT — Fix Prompt #4

> Baca `.agents/skills/gsap/SKILL.md` dan `.agents/skills/payload/SKILL.md` sebelum menulis kode apapun.
> Fokus kode dulu, jangan jalankan `pnpm dev` kecuali diminta.

---

## [FIX 1] — Hapus Scroll Progress Bar

**Deskripsi:**
Ada elemen garis tipis horizontal yang muncul dan memanjang seiring scroll halaman (scroll progress indicator). Hapus sepenuhnya — elemen ini tidak berguna dan mengganggu tampilan.

**Langkah:**

```
1. Cari dan hapus elemen progress bar di semua file berikut:
   - src/components/layout/Navbar.tsx
   - src/app/(frontend)/blog/[slug]/page.tsx
   - src/app/(frontend)/layout.tsx
   - Cek semua file di src/components/ yang mengandung kata kunci:
     "progress", "progressBar", "scrollProgress", "scaleX", "reading-progress"

2. Hapus semua kode yang berkaitan, contoh pola yang harus dihapus:

   GSAP pattern:
     gsap.to(progressRef.current, { scaleX: ..., scrub: true })
     ScrollTrigger.create({ ... scaleX ... scrub ... })

   CSS pattern:
     .progress-bar { transform: scaleX(...) }
     .reading-progress { width: ... }

   JSX pattern:
     <div ref={progressRef} className="... h-[1px] ... origin-left ..." />
     <div className="scroll-progress ..." />
     Apapun elemen dengan role/purpose sebagai progress indicator

3. Hapus juga ref, state, dan useEffect yang hanya digunakan untuk progress bar:
   - const progressRef = useRef(...)  ← hapus jika hanya untuk progress
   - const [progress, setProgress] = useState(0)  ← hapus jika hanya untuk progress
   - useEffect yang isinya hanya update progress bar  ← hapus

4. Setelah penghapusan, pastikan tidak ada elemen div kosong
   atau ref yang menunjuk ke null yang bisa menyebabkan error.

5. Jalankan pnpm tsc --noEmit untuk pastikan tidak ada TypeScript error
   akibat penghapusan.
```

---

## [FIX 2] — Animasi Scroll Reveal Hanya Sekali (Play Once, No Reverse)

**Deskripsi:**
Saat ini animasi scroll reveal menggunakan `toggleActions: "play none none reverse"` yang menyebabkan animasi reset (balik ke state awal) ketika user scroll ke atas, lalu animasi muncul lagi saat scroll ke bawah. Ubah agar animasi hanya berjalan **satu kali** per session halaman — setelah muncul, elemen tidak pernah kembali ke state tersembunyi.

**Langkah:**

```
1. Cari semua penggunaan ScrollTrigger di seluruh codebase:
   - src/hooks/useScrollReveal.ts
   - src/components/sections/**/*.tsx
   - src/components/layout/**/*.tsx
   - src/app/(frontend)/**/*.tsx

2. Ganti semua nilai toggleActions menjadi "play none none none":

   SEBELUM:
   toggleActions: "play none none reverse"
   toggleActions: "play reverse play reverse"
   toggleActions: "play pause resume reverse"

   SESUDAH:
   toggleActions: "play none none none"

   Artinya:
   - onEnter: play  ← animasi muncul ketika elemen masuk viewport
   - onLeave: none  ← tidak ada aksi ketika elemen keluar viewport (scroll turun)
   - onEnterBack: none  ← tidak ada aksi ketika elemen masuk lagi dari bawah
   - onLeaveBack: none  ← tidak ada aksi ketika elemen keluar ke atas (scroll naik)

3. Untuk animasi yang menggunakan `once: true` pada ScrollTrigger, tambahkan:
   once: true
   Ini adalah cara paling clean — ScrollTrigger otomatis kill dirinya sendiri
   setelah animasi selesai, tidak bisa diulang.

   Contoh:
   ScrollTrigger.create({
     trigger: el,
     start: "top 88%",
     once: true,        // ← tambahkan ini
     onEnter: () => {
       gsap.to(el, { opacity: 1, y: 0, duration: 0.75 })
     }
   })

4. Jika menggunakan custom hook useScrollReveal.ts, update default options:

   const defaultOptions = {
     start: "top 88%",
     once: true,                     // ← ganti dari toggleActions
     // HAPUS: toggleActions: "play none none reverse"
   }

5. Untuk animasi SplitText (splitChars, splitWords, splitLines):
   Setelah animasi selesai, pastikan tidak ada reverse.
   Gunakan pola onComplete untuk membersihkan split jika perlu:

   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: el,
       start: "top 88%",
       once: true,
     }
   })
   tl.from(split.chars, {
     opacity: 0,
     y: 60,
     stagger: 0.025,
     duration: 0.6,
     ease: "power3.out",
   })

6. Untuk animasi yang menggunakan `scrub: true` (parallax, line draw):
   scrub tidak perlu diubah karena sifatnya memang mengikuti scroll posisi,
   bukan toggle. Biarkan scrub tetap seperti semula — kecuali itu adalah
   scroll progress bar (yang sudah dihapus di FIX 1).

7. Cek komponen Navbar — animasi hide/show navbar berdasarkan scroll direction
   TIDAK perlu diubah. Ini bukan scroll reveal biasa, melainkan UI behavior
   yang memang harus responsif setiap saat. Biarkan navbar tetap seperti sekarang.

8. Setelah semua perubahan, lakukan test mental:
   - User buka halaman → animasi muncul satu per satu ✓
   - User scroll ke atas → elemen tetap visible, tidak hilang ✓
   - User scroll ke bawah lagi → elemen sudah visible, tidak animasi ulang ✓
   - User pindah halaman via menu → halaman baru: animasi jalan lagi dari awal ✓
   - User reload halaman → animasi jalan lagi dari awal ✓
```

---

## [FIX 3] — Fitur Custom Logo di PayloadCMS (Admin + Frontend)

**Deskripsi:**
Tambahkan fitur upload logo di PayloadCMS admin panel. Logo yang diupload akan:
1. Menggantikan logo default di **admin dashboard PayloadCMS**
2. Digunakan sebagai logo di **frontend website** (Navbar dan Footer)

**Langkah implementasi:**

```
=== BAGIAN A — Update Global SiteSettings ===

1. Buka src/globals/SiteSettings.ts
   Tambahkan field baru untuk logo:

   {
     name: 'logoLight',
     label: 'Logo (Light Version — untuk background putih)',
     type: 'upload',
     relationTo: 'media',
     required: false,
   },
   {
     name: 'logoDark',
     label: 'Logo (Dark Version — untuk background hitam)',
     type: 'upload',
     relationTo: 'media',
     required: false,
   },
   {
     name: 'logoAlt',
     label: 'Logo Alt Text',
     type: 'text',
     defaultValue: 'Raclebit',
   },
   {
     name: 'favicon',
     label: 'Favicon (SVG atau ICO)',
     type: 'upload',
     relationTo: 'media',
     required: false,
   }

   Pastikan field ini di bawah field siteName dan tagline yang sudah ada.

=== BAGIAN B — Custom Logo di PayloadCMS Admin Panel ===

2. Buat file: src/components/admin/AdminLogo.tsx

   'use client'

   import React from 'react'

   // Komponen ini dirender di dalam admin panel PayloadCMS
   // Ia fetch logo dari API Payload dan menampilkannya
   export const AdminLogo = () => {
     const [logoUrl, setLogoUrl] = React.useState<string | null>(null)

     React.useEffect(() => {
       fetch('/api/globals/site-settings?depth=1')
         .then(res => res.json())
         .then(data => {
           if (data?.logoLight?.url) {
             setLogoUrl(data.logoLight.url)
           }
         })
         .catch(() => {
           // Fallback ke teks jika fetch gagal
         })
     }, [])

     if (logoUrl) {
       return (
         <img
           src={logoUrl}
           alt="Raclebit"
           style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
         />
       )
     }

     // Fallback: teks jika tidak ada logo yang diupload
     return (
       <span style={{
         fontFamily: 'sans-serif',
         fontWeight: 700,
         fontSize: '18px',
         letterSpacing: '-0.02em',
         color: '#1B1B1B',
       }}>
         Raclebit
       </span>
     )
   }

3. Buat file: src/components/admin/AdminIcon.tsx
   (Versi kecil untuk icon di sidebar/favicon admin)

   'use client'

   import React from 'react'

   export const AdminIcon = () => {
     return (
       <span style={{
         fontFamily: 'sans-serif',
         fontWeight: 900,
         fontSize: '20px',
         color: '#1B1B1B',
       }}>
         R
       </span>
     )
   }

4. Update src/payload.config.ts — daftarkan custom logo di admin config:

   import { AdminLogo } from './components/admin/AdminLogo'
   import { AdminIcon } from './components/admin/AdminIcon'

   export default buildConfig({
     admin: {
       user: Users.slug,
       components: {
         graphics: {
           Logo: AdminLogo,    // ← Logo di halaman login dan header admin
           Icon: AdminIcon,    // ← Icon kecil di collapsed sidebar
         },
       },
       // ... konfigurasi lainnya
     },
     // ... rest of config
   })

=== BAGIAN C — Gunakan Logo dari CMS di Frontend ===

5. Buat server function helper: src/lib/getSiteSettings.ts

   import { getPayloadClient } from './payload'

   export async function getSiteSettings() {
     const payload = await getPayloadClient()
     const settings = await payload.findGlobal({
       slug: 'site-settings',
       depth: 2,
     })
     return settings
   }

   Type yang direturn mencakup:
   - settings.logoLight: { url: string, alt: string } | null
   - settings.logoDark: { url: string, alt: string } | null
   - settings.logoAlt: string
   - settings.siteName: string

6. Update src/components/layout/Navbar.tsx:

   Navbar adalah Server Component (atau hybrid).
   Fetch site settings di Server Component induknya dan pass sebagai props:

   Di layout.tsx atau page yang wrapping Navbar:
     const settings = await getSiteSettings()

   Props Navbar:
     interface NavbarProps {
       logoLightUrl?: string
       logoDarkUrl?: string
       logoAlt?: string
       siteName?: string
     }

   Di dalam Navbar, render logo:
     {logoLightUrl ? (
       <Image
         src={logoLightUrl}
         alt={logoAlt || 'Raclebit'}
         width={120}
         height={32}
         className="h-8 w-auto object-contain"
         priority
       />
     ) : (
       // Fallback: SVG logo inline yang sudah ada sebelumnya
       <DefaultLogoSVG />
     )}

7. Update src/components/layout/Footer.tsx:
   Sama seperti Navbar, gunakan logoDark (versi putih untuk background hitam):

     {logoDarkUrl ? (
       <Image
         src={logoDarkUrl}
         alt={logoAlt || 'Raclebit'}
         width={120}
         height={32}
         className="h-8 w-auto object-contain brightness-0 invert"
         // brightness-0 invert = paksa jadi putih jika logo berwarna gelap
       />
     ) : (
       <DefaultLogoWhiteSVG />
     )}

   Atau lebih baik: upload dua versi logo terpisah di admin
   (logoLight untuk navbar putih, logoDark untuk footer hitam)
   sehingga tidak perlu CSS filter.

8. Update src/app/(frontend)/layout.tsx:
   Fetch settings satu kali di layout induk dan pass ke Navbar dan Footer:

   const settings = await getSiteSettings()

   return (
     <html>
       <body>
         <Navbar
           logoLightUrl={settings?.logoLight?.url}
           logoDarkUrl={settings?.logoDark?.url}
           logoAlt={settings?.logoAlt}
         />
         {children}
         <Footer
           logoLightUrl={settings?.logoLight?.url}
           logoDarkUrl={settings?.logoDark?.url}
           logoAlt={settings?.logoAlt}
         />
       </body>
     </html>
   )

=== BAGIAN D — Favicon Dinamis ===

9. Update src/app/layout.tsx (root layout, bukan frontend layout):
   Gunakan favicon dari CMS jika tersedia:

   export async function generateMetadata() {
     const settings = await getSiteSettings()

     return {
       icons: {
         icon: settings?.favicon?.url || '/favicon.ico',
         apple: settings?.favicon?.url || '/apple-touch-icon.png',
       },
     }
   }

=== BAGIAN E — Instruksi untuk Admin (Dokumentasi inline di CMS) ===

10. Tambahkan description pada field logo di SiteSettings.ts
    agar admin tahu cara menggunakannya:

    {
      name: 'logoLight',
      label: 'Logo (Light — Background Putih)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload logo versi gelap (hitam) untuk digunakan di navbar dan area background putih. Format: SVG atau PNG transparan. Ukuran disarankan: minimal 240x64px.',
      }
    },
    {
      name: 'logoDark',
      label: 'Logo (Dark — Background Hitam)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload logo versi terang (putih) untuk digunakan di footer dan area background hitam. Format: SVG atau PNG transparan. Ukuran disarankan: minimal 240x64px.',
      }
    }
```

---

## ✅ Checklist Verifikasi

- [ ] Scroll progress bar tidak muncul di halaman manapun
- [ ] Tidak ada elemen garis horizontal yang bergerak saat scroll
- [ ] Tidak ada ref atau useEffect yang orphan setelah penghapusan progress bar
- [ ] Animasi scroll reveal hanya muncul sekali per halaman load
- [ ] Scroll ke atas setelah elemen revealed: elemen tetap visible
- [ ] Scroll ke bawah lagi: elemen tidak animasi ulang
- [ ] Pindah halaman via menu lalu kembali: animasi jalan lagi dari awal ✓
- [ ] Field `logoLight`, `logoDark`, `logoAlt`, `favicon` muncul di `/admin/globals/site-settings`
- [ ] Upload logo di admin: logo muncul di header admin panel (ganti default Payload logo)
- [ ] Upload logo di admin: logo muncul di Navbar frontend
- [ ] Upload logo dark di admin: logo muncul di Footer frontend
- [ ] Fallback ke SVG inline jika tidak ada logo yang diupload
- [ ] `pnpm tsc --noEmit` — tidak ada TypeScript error
