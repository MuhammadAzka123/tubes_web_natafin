# NataFin

## Deskripsi Proyek

NataFin adalah aplikasi web pengelolaan keuangan pribadi yang dirancang untuk membantu pengguna mencatat pemasukan dan pengeluaran, memantau tabungan, serta melihat ringkasan kondisi keuangan.

Proyek ini dikembangkan secara bertahap sebagai bagian dari tugas mata kuliah Pemrograman Web. Pada Tugas Minggu 5, aplikasi dikembangkan dengan menambahkan JavaScript dan jQuery untuk membuat halaman web lebih interaktif dan dinamis.

## Fitur Aplikasi

- **Dashboard:** Menampilkan ringkasan pemasukan, pengeluaran, tabungan, saldo, dan transaksi.
- **Manajemen Transaksi:** Menambahkan dan menghapus transaksi pemasukan maupun pengeluaran.
- **Pencarian Transaksi:** Mencari transaksi berdasarkan kata kunci.
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
- Local Storage untuk menyimpan data transaksi pada browser

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

1. Clone atau download repository NataFin dari GitHub.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Jalankan file `index.html` menggunakan ekstensi Live Server.
4. Aplikasi akan terbuka melalui browser.
5. Coba fitur yang tersedia, seperti melihat ringkasan keuangan, menambahkan transaksi, melakukan pencarian dan filter, menghapus transaksi, serta menguji validasi form.

## Implementasi JavaScript dan jQuery

Pada pengembangan Tugas Minggu 5, JavaScript digunakan untuk mengolah data transaksi, menghitung ringkasan keuangan, dan menampilkan data secara dinamis ke halaman web.

JavaScript juga digunakan untuk melakukan pencarian dan filter transaksi, menangani penambahan serta penghapusan transaksi, dan memvalidasi input pengguna sebelum diproses.

Sementara itu, jQuery digunakan untuk menangani event pengguna, menjalankan efek tampil dan sembunyi pada form, serta menampilkan pesan validasi. Data transaksi disimpan menggunakan Local Storage agar tetap tersedia ketika halaman dibuka kembali pada browser yang sama.

## Dokumentasi Screenshot

Dokumentasi screenshot pengembangan NataFin disimpan dalam folder berikut:

`docs/screenshots/`

Screenshot dikelompokkan berdasarkan minggu pengerjaan, yaitu:

- `docs/screenshots/minggu-2/`
- `docs/screenshots/minggu-3/`
- `docs/screenshots/minggu-4/`
- `docs/screenshots/minggu-5/`

Dokumentasi Minggu 5 mencakup pengujian interaktivitas aplikasi, seperti efek tampil dan sembunyi form, penambahan transaksi, pencarian dan filter, penghapusan transaksi, serta validasi form.

## Video Demonstrasi

Video demonstrasi interaktivitas NataFin untuk Tugas Minggu 5 dapat ditonton melalui tautan berikut:

**https://drive.google.com/drive/folders/105IiEub5SnkWG1rpdCUArmDDxrm2BUhx?usp=sharing**

Video disimpan di Google Drive dalam folder `Dokumentasi_Web_NataFin` dengan nama file `Demonstrasi_Minggu_5.mp4`.

## Catatan

NataFin merupakan proyek pembelajaran yang dikembangkan secara bertahap. Fitur akun berupa simulasi antarmuka dan validasi form, belum menggunakan sistem autentikasi atau database pada server.

---
