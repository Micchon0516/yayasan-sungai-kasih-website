# Yayasan Sungai Kasih — Website

Website company profile statis (HTML/CSS/JavaScript vanilla, tanpa framework/build step) untuk Yayasan Sungai Kasih.

## Struktur

```
├── index.html          # Semua konten & section (Hero, Tentang, Program, Peduli Flores, Peduli Kabut Asap, Stats, Galeri, Kontak, Footer)
├── css/style.css        # Design system (warna, tipografi, komponen, responsive)
├── js/main.js            # Nav mobile, scroll reveal, counter animasi, salin no. rekening, form
├── assets/img/           # Logo (SVG) + poster kampanye
└── vercel.json           # Konfigurasi deploy Vercel (clean URL + cache asset)
```

## Menjalankan secara lokal

Karena tidak ada build step, cukup buka `index.html` di browser, atau jalankan server statis sederhana:

```bash
npx serve .
```

## Deploy ke Vercel

1. Install Vercel CLI (sekali saja): `npm i -g vercel`
2. Dari folder project ini, jalankan:
   ```bash
   vercel
   ```
   Ikuti prompt (login, pilih scope, konfirmasi folder project) → Vercel akan memberi URL `*.vercel.app`.
3. Untuk production deploy: `vercel --prod`

Atau tanpa CLI: push folder ini ke repo GitHub, lalu import repo tersebut di [vercel.com/new](https://vercel.com/new) — Vercel otomatis mendeteksi ini sebagai static site (tidak perlu build command).

## Menghubungkan domain sendiri

1. Buka **Project Settings → Domains** di dashboard Vercel.
2. Tambahkan domain, misal `yayasansungaikasih.com`.
3. Ikuti instruksi DNS yang diberikan Vercel — pilih salah satu:
   - **Nameserver Vercel** (paling simpel, semua record otomatis)
   - **A record manual** ke `76.76.21.21` untuk root domain + **CNAME** `www` → `cname.vercel-dns.com`
4. Tunggu propagasi DNS (beberapa menit–24 jam). SSL/HTTPS otomatis aktif setelah domain terverifikasi.

> Jika email kantor (`info@yayasansungaikasih.com`) masih pakai provider lain, jangan pindah nameserver ke Vercel — cukup tambahkan A/CNAME record manual agar MX record email tidak ikut berubah.

## Yang perlu diisi/disesuaikan sebelum go-live

- [ ] Ganti foto poster di `assets/img/` dengan foto asli beresolusi tinggi (dokumentasi kegiatan, bukan hanya poster kampanye) untuk bagian Hero & Galeri.
- [ ] Form kontak (`js/main.js` bagian `contactForm`) saat ini hanya demo (tidak mengirim email). Hubungkan ke layanan seperti Formspree, Resend, atau endpoint backend sendiri sebelum publish.
- [ ] Verifikasi ulang nomor rekening, kode donasi, dan kontak sekretariat sebelum publish — data saat ini diambil dari poster & profil yayasan.
- [ ] Tambahkan akun Instagram Rumah Ceria (`@rumahceria_ysk`) yang benar bila berbeda dari asumsi di footer.
- [ ] Ganti embed peta di section Kontak dengan koordinat pasti kantor bila diperlukan presisi lebih tinggi.
