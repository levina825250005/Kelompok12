# Kos Ibu Tri - React + Bootstrap + AdminLTE v4

Website Kos Ibu Tri menggunakan React, React Router, Bootstrap 5, dan AdminLTE v4 untuk kerangka Admin Dashboard.
Project ini memiliki website pengunjung dan Admin Dashboard demo.

## AdminLTE v4

Dashboard admin menggunakan template resmi AdminLTE v4 melalui asset CDN: Bootstrap 5.3.8, Bootstrap Icons, OverlayScrollbars, dan AdminLTE 4.10.0. Struktur layout menggunakan `app-wrapper`, `app-header`, `app-sidebar`, `app-main`, dan `app-footer`. Komponen React dan fungsi CRUD lama tetap dipakai; AdminLTE digunakan untuk kerangka serta navigasi dashboard.

Koneksi internet diperlukan saat membuka aplikasi agar asset AdminLTE dan dependensinya dapat dimuat dari CDN. Website pengunjung dan logika data tidak diubah oleh integrasi ini.

## Cara menjalankan project yang benar

1. Ekstrak file ZIP sampai terlihat folder `kos-ibu-tri-admin-dashboard`.
2. Buka folder `kos-ibu-tri-admin-dashboard` di VS Code. Pastikan di dalam folder yang dibuka ada `package.json`, `index.html`, dan folder `src`.
3. Buka terminal VS Code. Pastikan terminal berada di folder yang sama dengan `package.json`.
4. Jalankan:

   ```bash
   npm install
   npm run dev
   ```

5. Vite untuk project ini dikunci ke port **5174** agar tidak tertukar dengan project lama yang mungkin masih berjalan di port 5173.
6. Buka URL yang ditampilkan terminal. Biasanya:

   - Website pengunjung: `http://localhost:5174/`
   - Login admin: `http://localhost:5174/admin/login`

   Jangan gunakan `localhost:5173` untuk ZIP ini.

## Akun demo admin

- Username: `admin`
- Password: `kostibutri`

## Halaman website

- `/` - Home
- `/kamar-harga` - Kamar & Fasilitas
- `/about-us` - About Us
- `/promo` - Promo dan Form Booking

## Menu Admin Dashboard

- Overview: ringkasan kamar, promo, dan booking.
- Data Kamar: tambah, lihat, ubah, dan hapus kamar.
- Data Promo: tambah, lihat, ubah, dan hapus promo.
- Data Booking: melihat booking dari form website, melihat detail, mengubah status, dan menghapus booking.

## Penyimpanan data

Data demo disimpan di browser menggunakan `localStorage`. Booking baru dari form pengunjung akan muncul di menu Data Booking. Perubahan kamar dan promo juga digunakan pada website pengunjung.

Dashboard ini adalah simulasi front-end untuk pembelajaran. Login demo belum menggunakan autentikasi server, dan data tidak tersinkronisasi antarperangkat atau browser. Untuk penggunaan sungguhan, hubungkan aplikasi ke backend/API dan database.
\n\nCatatan responsif: pada layar di bawah 992px, sidebar AdminLTE otomatis ditutup setelah admin memilih menu agar konten halaman terlihat penuh.\n

## Menu Data Pembayaran
- Menu baru tersedia pada `/admin/pembayaran`.
- Daftar penghuni diambil dari booking dengan status `Diterima`.
- Lama tinggal dihitung dari tanggal masuk pada data booking.
- Jumlah pembayaran dihitung dari transaksi yang dicatat melalui tombol `Catat Bayar`.
- Lama tunggakan dihitung dari tanggal jatuh tempo berikutnya.
- Riwayat pembayaran dan tanggal jatuh tempo disimpan pada `localStorage` dengan key `kosIbuTri_paymentRecords`.
- Saat mencatat pembayaran, admin memasukkan jumlah bulan sewa yang dibayar (1–12). Satu kali pencatatan dihitung sebagai satu transaksi, dan tanggal jatuh tempo maju sesuai jumlah bulan yang dibayar.

Catatan: fitur ini merupakan simulasi front-end berbasis `localStorage`, belum terhubung ke payment gateway atau database server. Pastikan tanggal masuk booking dan status `Diterima` sudah benar agar ringkasan pembayaran sesuai.
