# NataFin

## Deskripsi

NataFin adalah aplikasi web pengelolaan keuangan pribadi yang dirancang untuk membantu pengguna mencatat pemasukan dan pengeluaran, memantau tabungan, serta melihat ringkasan kondisi keuangan.

Proyek ini dikembangkan secara bertahap sebagai bagian dari tugas mata kuliah Pemrograman Web. Pengembangan dimulai dengan HTML, CSS, JavaScript, dan jQuery, kemudian dilanjutkan menggunakan React untuk menerapkan konsep component-based development dan konsumsi Mock API. Pada Minggu 9, aplikasi mulai dilengkapi dengan backend menggunakan NestJS.

## Fitur Aplikasi

- **Dashboard:** Menampilkan ringkasan pemasukan, pengeluaran, tabungan, saldo, dan transaksi.
- **Manajemen Transaksi:** Menambahkan, mengedit, dan menghapus transaksi pemasukan maupun pengeluaran.
- **Pencarian Transaksi:** Mencari transaksi berdasarkan keterangan, kategori, atau tanggal.
- **Filter Transaksi:** Menampilkan transaksi berdasarkan jenis pemasukan atau pengeluaran.
- **Detail Keuangan:** Menampilkan ringkasan transaksi dan informasi kategori pengeluaran.
- **Target Tabungan:** Menampilkan informasi target tabungan.
- **Validasi Form:** Memeriksa kelengkapan data sebelum form diproses.
- **Interaksi JavaScript dan jQuery:** Menangani event pengguna, mengolah data transaksi, dan menjalankan efek tampil dan sembunyi pada form.
- **Konsumsi Mock API:** Mengambil dan menampilkan data transaksi menggunakan Fetch API dan JSON Server.
- **Loading dan Error Handling:** Menampilkan indikator loading, data berhasil dimuat, dan pesan error.
- **Retry:** Mengulangi permintaan data melalui tombol Coba Lagi.
- **REST API:** Mengelola data transaksi melalui backend NestJS.
- **Validasi Backend:** Memvalidasi data menggunakan class-validator dan ValidationPipe.
- **Integrasi Frontend dan Backend:** Menghubungkan React dengan NestJS untuk melakukan operasi tambah, tampil, ubah, dan hapus transaksi.

## Teknologi yang Digunakan

**Pengembangan Awal (Minggu 2–5)**
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery 3.7.1
- Local Storage

**Pengembangan React (Minggu 6–7)**
- React
- Vite
- JavaScript
- Fetch API
- JSON Server
- Material UI (MUI)
- CSS

**Pengembangan Backend (Minggu 9)**
- Node.js
- NestJS
- TypeScript
- REST API
- class-validator
- class-transformer
- Dependency Injection

## Struktur Folder

```text
tubes_web_natafin/
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
│       ├── minggu-5/
│       ├── minggu-6/
│       ├── minggu-7/
│       └── minggu-9/
├── pages/
│   ├── akun/
│   ├── keuangan/
│   └── transaksi/
├── natafin-react/
│   ├── public/
│   ├── src/
│   │   └── components/
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── natafin-backend/
│   ├── src/
│   │   ├── transactions/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── transactions.controller.ts
│   │   │   ├── transactions.module.ts
│   │   │   └── transactions.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── transactions.http
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── index.html
├── script.js
└── README.md
```

## Implementasi JavaScript dan jQuery (Minggu 5)

Pada pengembangan Minggu 5, JavaScript digunakan untuk mengolah data transaksi, menghitung ringkasan keuangan, serta menampilkan data secara dinamis pada halaman web.

JavaScript juga digunakan untuk menangani penambahan, pengeditan, penghapusan, pencarian, dan filter transaksi. Sementara itu, jQuery digunakan untuk menangani event pengguna, menjalankan efek tampil dan sembunyi pada form, serta menampilkan pesan validasi.

Data transaksi disimpan menggunakan Local Storage agar tetap tersedia ketika halaman dibuka kembali pada browser yang sama.

## Implementasi React (Minggu 6)

Pada Minggu 6, aplikasi mulai dikembangkan menggunakan React dan Vite. Tampilan aplikasi dibagi menjadi beberapa komponen agar kode lebih terstruktur dan mudah dikelola.

React `useState` digunakan untuk mengelola data transaksi dan interaksi pengguna, termasuk penambahan serta penghapusan transaksi.

## Implementasi AJAX dan Konsumsi Mock API (Minggu 7)

Pada Minggu 7, ditambahkan fitur pengambilan data transaksi menggunakan Fetch API dan JSON Server sebagai Mock API.

Data transaksi disimpan dalam file `db.json` dan diakses melalui endpoint:

`http://localhost:3001/transactions`

Pengambilan data menggunakan `fetch()` dengan pengelolaan state React melalui `useState` dan `useEffect`.

Fitur ini menerapkan beberapa kondisi:
- **Loading:** Menampilkan indikator ketika data sedang dimuat.
- **Success:** Menampilkan daftar transaksi ketika data berhasil diperoleh.
- **Error:** Menampilkan pesan ketika pengambilan data gagal.
- **Retry:** Menyediakan tombol Coba Lagi untuk mengulangi permintaan data.

Material UI (MUI) digunakan untuk membangun komponen antarmuka seperti kartu transaksi, indikator loading, pesan error, tombol, dan label kategori transaksi.

## Implementasi Backend NestJS dan Struktur MVC (Minggu 9)

Pada Minggu 9, NataFin dikembangkan dengan menambahkan fondasi backend menggunakan NestJS dan TypeScript. Backend dibuat dengan struktur MVC untuk mengelola data transaksi melalui REST API.

### Struktur Backend

Backend menggunakan resource Transactions yang terdiri dari:
- **Entity:** Mendefinisikan struktur data transaksi.
- **DTO:** Mengatur bentuk data dan validasi input.
- **Controller:** Menangani request HTTP.
- **Service:** Mengelola logika bisnis dan operasi CRUD.
- **Module:** Menghubungkan Controller dan Service.

### Fitur Backend

- **GET:** Mengambil seluruh transaksi dan transaksi berdasarkan ID.
- **POST:** Menambahkan transaksi baru.
- **PATCH:** Mengubah data transaksi.
- **DELETE:** Menghapus transaksi.
- **Validasi Data:** Menggunakan class-validator dan ValidationPipe.
- **Penanganan Error:** Menggunakan NotFoundException dan ConflictException.
- **Dependency Injection:** Menghubungkan Controller dengan Service.

Data transaksi sementara disimpan menggunakan array di dalam Service.

### Integrasi Frontend dan Backend

Frontend React diintegrasikan dengan backend NestJS melalui Fetch API. Integrasi mencakup proses menampilkan, menambahkan, mengubah, dan menghapus transaksi melalui dashboard NataFin.

Backend menyediakan endpoint utama:

`http://localhost:3000/transactions`

### Pengujian REST API

Pengujian endpoint dilakukan menggunakan REST Client pada Visual Studio Code melalui file `transactions.http`.

Pengujian mencakup:
- Pengambilan seluruh data transaksi.
- Penambahan transaksi.
- Pengambilan transaksi berdasarkan ID.
- Perubahan data transaksi.
- Penghapusan transaksi.
- Pengujian transaksi duplikat.
- Pengujian validasi input.

## Cara Menjalankan Aplikasi

Untuk menjalankan versi React dan backend NestJS, gunakan tiga terminal berbeda.

**1. Menjalankan JSON Server**

Masuk ke folder `natafin-react`:

```bash
cd natafin-react
npm install
npm run mock-api
```

JSON Server berjalan pada port `3001`.

**2. Menjalankan React + Vite**

Buka terminal kedua, lalu masuk ke folder `natafin-react`:

```bash
cd natafin-react
npm run dev
```

Aplikasi React berjalan pada port `5173`.

**3. Menjalankan Backend NestJS**

Buka terminal ketiga, lalu masuk ke folder `natafin-backend`:

```bash
cd natafin-backend
npm install
npm run start:dev
```

Backend NestJS berjalan pada port `3000`.

Ketiga server perlu berjalan bersamaan agar fitur Mock API dan integrasi frontend-backend dapat digunakan.

## Dokumentasi Screenshot

Dokumentasi pengembangan NataFin disimpan dalam folder `docs/screenshots/` dan dikelompokkan berdasarkan minggu pengerjaan:

- `docs/screenshots/minggu-2/`
- `docs/screenshots/minggu-3/`
- `docs/screenshots/minggu-4/`
- `docs/screenshots/minggu-5/`
- `docs/screenshots/minggu-6/`
- `docs/screenshots/minggu-7/`
- `docs/screenshots/minggu-9/`

Dokumentasi Minggu 5 mencakup pengujian interaktivitas aplikasi, seperti penambahan, pengeditan, pencarian, filter, dan penghapusan transaksi.

Dokumentasi Minggu 6 mencakup setup React dengan Vite, struktur komponen, tampilan dashboard, dan interaksi transaksi.

Dokumentasi Minggu 7 mencakup pengujian konsumsi Mock API dengan kondisi loading, success, dan error.

Dokumentasi Minggu 9 mencakup setup backend NestJS, struktur resource Transactions, pengujian REST API, validasi data, penanganan error, dan integrasi frontend dengan backend.

## Video Demonstrasi

Video demonstrasi interaktivitas NataFin untuk Tugas Minggu 5 tersedia melalui folder Google Drive berikut:

[Lihat Video Demonstrasi NataFin](https://drive.google.com/drive/folders/105IiEub5SnkWG1rpdCUArmDDxrm2BUhx?usp=sharing)

Video disimpan dalam folder `Dokumentasi_Web_NataFin` dengan nama file `Demonstrasi_Minggu_5.mp4`.