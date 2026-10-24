# NataFin

## Deskripsi Proyek

NataFin adalah aplikasi web pengelolaan keuangan pribadi yang dirancang untuk membantu pengguna mencatat pemasukan dan pengeluaran, memantau tabungan, serta melihat ringkasan kondisi keuangan.

Proyek ini dikembangkan secara bertahap sebagai bagian dari tugas mata kuliah Pemrograman Web. Pada Tugas Minggu 5, NataFin dikembangkan dengan menambahkan JavaScript dan jQuery untuk membuat halaman web lebih interaktif dan dinamis.

## Fitur Aplikasi

- **Dashboard:** Menampilkan ringkasan pemasukan, pengeluaran, tabungan, saldo, dan transaksi.
- **Manajemen Transaksi:** Menambahkan, mengedit, dan menghapus transaksi pemasukan maupun pengeluaran.
- **Pencarian Transaksi:** Mencari transaksi berdasarkan keterangan, kategori, atau tanggal.
- **Filter Transaksi:** Menampilkan transaksi berdasarkan jenis pemasukan atau pengeluaran.
- **Detail Keuangan:** Menampilkan ringkasan transaksi dan informasi kategori pengeluaran.
- **Target Tabungan:** Menampilkan informasi target tabungan.
- **Validasi Form:** Memeriksa kelengkapan data sebelum form diproses.
- **Interaksi JavaScript dan jQuery:** Mengolah data transaksi, menangani event pengguna, menampilkan pesan, serta menjalankan efek tampil dan sembunyi pada form.

## Teknologi yang Digunakan

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery 3.7.1
- Local Storage untuk menyimpan data transaksi pada browser.

## Struktur Folder

```text
natafin/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── img/
│       └── logo_natafin.png
├── docs/
│   └── screenshots/
│       ├── minggu-2/
│       ├── minggu-3/
│       ├── minggu-4/
│       └── minggu-5/
├── pages/
│   ├── akun/
│   │   ├── login.html
│   │   ├── logout.html
│   │   ├── profil.html
│   │   └── register.html
│   ├── keuangan/
│   │   └── detail.html
│   └── transaksi/
│       └── transaksi.html
├── .gitignore
├── index.html
├── README.md
└── script.js
```

## Cara Menjalankan Aplikasi

1. Clone atau unduh repository NataFin dari GitHub.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan ekstensi Live Server.
4. Aplikasi akan terbuka melalui browser.
5. Coba fitur yang tersedia, seperti melihat ringkasan keuangan, menambahkan transaksi, mengedit transaksi, mencari dan memfilter transaksi, menghapus transaksi, serta menguji validasi form.

## Implementasi JavaScript dan jQuery

Pada pengembangan Tugas Minggu 5, JavaScript digunakan untuk mengolah data transaksi, menghitung ringkasan keuangan, dan menampilkan data secara dinamis ke halaman web.

JavaScript juga digunakan untuk melakukan pencarian dan filter transaksi, menangani penambahan, pengeditan, serta penghapusan transaksi, dan memvalidasi input pengguna sebelum diproses.

Sementara itu, jQuery digunakan untuk menangani event pengguna, menjalankan efek tampil dan sembunyi pada form, serta menampilkan pesan validasi. Data transaksi disimpan menggunakan Local Storage agar tetap tersedia ketika halaman dibuka kembali pada browser yang sama.

## Dokumentasi Screenshot

Dokumentasi screenshot pengembangan NataFin disimpan dalam folder `docs/screenshots/` dan dikelompokkan berdasarkan minggu pengerjaan:

- `docs/screenshots/minggu-2/`
- `docs/screenshots/minggu-3/`
- `docs/screenshots/minggu-4/`
- `docs/screenshots/minggu-5/`

Dokumentasi Minggu 5 mencakup pengujian interaktivitas aplikasi pada tampilan desktop dan mobile, seperti efek tampil dan sembunyi form, penambahan transaksi, pencarian dan filter, penghapusan transaksi, validasi form, serta pengeditan transaksi.

Screenshot pengeditan transaksi menunjukkan proses pemilihan transaksi, pengubahan data pada form, dan hasil setelah perubahan disimpan.

## Video Demonstrasi

Video demonstrasi interaktivitas NataFin untuk Tugas Minggu 5 tersedia melalui folder Google Drive berikut:

**[Lihat Video Demonstrasi NataFin](https://drive.google.com/drive/folders/105IiEub5SnkWG1rpdCUArmDDxrm2BUhx?usp=sharing)**

Video disimpan dalam folder `Dokumentasi_Web_NataFin` dengan nama file `Demonstrasi_Minggu_5.mp4`.
