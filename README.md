# NataFin

## Deskripsi

NataFin adalah aplikasi web pengelolaan keuangan pribadi yang dirancang untuk membantu pengguna mencatat pemasukan dan pengeluaran, memantau tabungan, serta melihat ringkasan kondisi keuangan.

Proyek ini dikembangkan secara bertahap sebagai bagian dari tugas mata kuliah Pemrograman Web. Pengembangan dimulai menggunakan HTML, CSS, JavaScript, dan jQuery, kemudian dilanjutkan menggunakan React untuk menerapkan konsep component-based development dan konsumsi Mock API. Pada Minggu 9, aplikasi dilengkapi dengan backend menggunakan NestJS. Selanjutnya, pada Minggu 10, backend diintegrasikan dengan PostgreSQL menggunakan Prisma ORM agar data transaksi tersimpan secara permanen.

## Fitur Aplikasi

- **Dashboard:** Menampilkan ringkasan pemasukan, pengeluaran, sisa saldo, dan jumlah transaksi.
- **Manajemen Transaksi:** Menambahkan, mengedit, dan menghapus transaksi pemasukan maupun pengeluaran.
- **Konfirmasi Transaksi:** Menampilkan dialog konfirmasi sebelum menambahkan, mengubah, atau menghapus transaksi.
- **Ringkasan Keuangan:** Menampilkan total pemasukan, total pengeluaran, sisa saldo, dan jumlah transaksi.
- **Pencarian Transaksi:** Mencari transaksi berdasarkan keterangan, kategori, atau tanggal.
- **Filter Transaksi:** Menampilkan transaksi berdasarkan jenis pemasukan atau pengeluaran.
- **Detail Keuangan:** Menampilkan ringkasan transaksi dan informasi kategori pengeluaran pada pengembangan awal.
- **Target Tabungan:** Menampilkan informasi target tabungan pada pengembangan awal.
- **Validasi Form:** Memeriksa kelengkapan data sebelum transaksi diproses.
- **Interaksi JavaScript dan jQuery:** Menangani event pengguna, mengolah data transaksi, serta menjalankan efek tampil dan sembunyi pada form.
- **Konsumsi Mock API:** Mengambil dan menampilkan data menggunakan Fetch API dan JSON Server.
- **Loading dan Error Handling:** Menampilkan indikator loading, status berhasil, dan pesan error.
- **Retry:** Mengulangi permintaan data melalui tombol Coba Lagi.
- **REST API:** Mengelola data transaksi melalui backend NestJS.
- **Validasi Backend:** Memvalidasi data menggunakan class-validator dan ValidationPipe.
- **Integrasi Frontend dan Backend:** Menghubungkan React dengan NestJS untuk operasi CRUD.
- **Database PostgreSQL:** Menyimpan transaksi secara permanen menggunakan Prisma ORM.

## Teknologi yang Digunakan

### Pengembangan Awal (Minggu 2–5)

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery 3.7.1
- Local Storage

### Pengembangan React (Minggu 6–7)

- React
- Vite
- JavaScript
- Fetch API
- JSON Server
- Material UI (MUI)
- CSS

### Pengembangan Backend (Minggu 9)

- Node.js
- NestJS
- TypeScript
- REST API
- class-validator
- class-transformer
- Dependency Injection

### Integrasi Database (Minggu 10)

- PostgreSQL 18
- Prisma ORM 7.10.1
- Prisma Client
- PostgreSQL Driver Adapter
- MUI Dialog

## Struktur Folder

```text
tubes_web_natafin/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── img/
│       └── logo_natafin.png
│
├── docs/
│   └── screenshots/
│       ├── minggu-2/
│       ├── minggu-3/
│       ├── minggu-4/
│       ├── minggu-5/
│       ├── minggu-6/
│       ├── minggu-7/
│       ├── minggu-9/
│       └── minggu-10/
│
├── pages/
│   ├── akun/
│   ├── keuangan/
│   └── transaksi/
│
├── natafin-react/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── natafin-backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── generated/
│   │   │   └── prisma/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── transactions/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── transactions.controller.ts
│   │   │   ├── transactions.module.ts
│   │   │   └── transactions.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── prisma7.config.ts
│   ├── transactions.http
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── index.html
├── script.js
└── README.md
```

Folder `src/generated/prisma/` merupakan hasil generate Prisma Client. Folder tersebut tidak perlu disimpan di GitHub karena dapat dibuat kembali menggunakan perintah Prisma Generate.

File `.env` berisi konfigurasi koneksi database dan tidak disertakan dalam repository.

## Implementasi JavaScript dan jQuery (Minggu 5)

Pada Minggu 5, JavaScript digunakan untuk mengolah data transaksi, menghitung ringkasan keuangan, serta menampilkan data secara dinamis pada halaman web.

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

Pada Minggu 9, NataFin dikembangkan dengan menambahkan fondasi backend menggunakan NestJS dan TypeScript. Backend dibuat menggunakan resource Transactions untuk mengelola data transaksi melalui REST API.

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

Pada tahap ini, data transaksi masih disimpan menggunakan array di dalam Service.

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

## Implementasi PostgreSQL dan Prisma ORM (Minggu 10)

Pada Minggu 10, backend NataFin dikembangkan lebih lanjut dengan mengintegrasikan REST API NestJS ke database PostgreSQL menggunakan Prisma ORM.

Implementasi ini menggantikan penyimpanan data sementara berbasis array pada Minggu 9 menjadi penyimpanan database permanen.

### Database PostgreSQL

Database lokal dibuat menggunakan PostgreSQL dengan nama:

`natafin_db`

Database tersebut digunakan untuk menyimpan data transaksi NataFin.

### Prisma Schema

Model utama yang digunakan adalah `Transaction`, dengan struktur field sebagai berikut:

| Field | Tipe Data | Keterangan |
|---|---|---|
| `id` | String (UUID) | ID unik transaksi |
| `description` | String | Keterangan transaksi |
| `amount` | Float | Nominal transaksi |
| `category` | String | Jenis transaksi (`income` atau `expense`) |
| `category_name` | String | Nama kategori transaksi |
| `transaction_date` | DateTime | Tanggal transaksi |

Schema dibuat dalam file `prisma/schema.prisma`.

### Prisma Service

PrismaService dibuat sebagai provider NestJS untuk menghubungkan aplikasi dengan PostgreSQL.

Implementasi terdiri dari:

- **PrismaService:** Menginisialisasi Prisma Client dan koneksi PostgreSQL.
- **PrismaModule:** Menyediakan dan mengekspor PrismaService agar dapat digunakan oleh module lain.
- **Prisma Client:** Menjalankan query database melalui service transaksi.
- **Prisma Migrate:** Mengelola perubahan struktur database melalui migrasi.

### Implementasi CRUD dengan Prisma

Seluruh operasi CRUD pada TransactionsService telah menggunakan Prisma Client:

- **Create:** Menambahkan transaksi ke PostgreSQL menggunakan `prisma.transaction.create()`.
- **Read:** Mengambil data menggunakan `findMany()` dan `findUnique()`.
- **Update:** Memperbarui transaksi menggunakan `update()`.
- **Delete:** Menghapus transaksi menggunakan `delete()`.

Controller dan endpoint REST API dari Minggu 9 tetap dipertahankan tanpa mengubah struktur endpoint.

### Validasi dan Penanganan Error

Validasi input tetap menggunakan DTO, class-validator, dan ValidationPipe.

Penanganan error yang diterapkan:

- **HTTP 400 Bad Request:** Menangani data transaksi yang tidak sesuai aturan validasi.
- **HTTP 404 Not Found:** Menangani transaksi yang tidak ditemukan.
- **HTTP 409 Conflict:** Menangani transaksi dengan data duplikat.

### Persistensi Data

Data transaksi disimpan secara permanen di PostgreSQL. Pengujian dilakukan dengan menghentikan dan menjalankan kembali server NestJS.

Data transaksi tetap tersedia setelah server dijalankan kembali karena penyimpanan sudah menggunakan database PostgreSQL.

### Integrasi React dengan PostgreSQL

Frontend React tetap menggunakan Fetch API untuk mengakses REST API NestJS.

Dengan integrasi ini, pengguna dapat menambahkan, melihat, mengubah, dan menghapus transaksi melalui antarmuka NataFin, sedangkan data transaksi dikelola dan disimpan melalui PostgreSQL.

### Penyempurnaan Antarmuka

Pada pengembangan antarmuka, dilakukan beberapa penyempurnaan:

- Mengatur ulang urutan kartu ringkasan keuangan.
- Menonjolkan kartu Sisa Saldo menggunakan warna navy.
- Menambahkan dialog konfirmasi sebelum menambah, mengubah, dan menghapus transaksi.
- Menyeragamkan tampilan tombol Edit dan Hapus.
- Menambahkan gaya hover dan focus untuk mendukung navigasi keyboard.
- Mempertahankan tampilan responsif pada desktop dan mobile.

### Hasil Pengujian

| Pengujian | Hasil |
|---|---|
| GET seluruh transaksi | HTTP 200 |
| GET transaksi berdasarkan ID | HTTP 200 |
| POST tambah transaksi | HTTP 201 |
| PATCH ubah transaksi | HTTP 200 |
| DELETE transaksi | HTTP 200 |
| Validasi data tidak valid | HTTP 400 |
| Transaksi duplikat | HTTP 409 |
| Transaksi tidak ditemukan | HTTP 404 |
| Persistensi setelah restart | Berhasil |
| Integrasi CRUD melalui React | Berhasil |

## Cara Menjalankan Aplikasi

Untuk menjalankan versi React dan backend NestJS, gunakan tiga terminal berbeda.

### Persiapan Database PostgreSQL

Pastikan PostgreSQL sudah terinstal dan layanan database sedang berjalan.

Buat database dengan nama:

```sql
CREATE DATABASE natafin_db;
```

### Konfigurasi Backend

Masuk ke folder `natafin-backend`:

```bash
cd natafin-backend
npm install
```

Buat file `.env` di dalam folder `natafin-backend` dan isi dengan koneksi database lokal:

```env
DATABASE_URL="postgresql://postgres:PASSWORD_TEMPLATEU@localhost:5432/natafin_db?schema=public"
```

Ganti `PASSWORD_TEMPLATE` dengan password PostgreSQL yang digunakan pada komputer masing-masing.

Jalankan migrasi dan generate Prisma Client:

```bash
npx prisma migrate dev
npx prisma generate
```

Setelah konfigurasi database selesai, jalankan backend:

```bash
npm run start:dev
```

Backend NestJS berjalan pada port `3000`.

### Menjalankan JSON Server

Buka terminal baru dan masuk ke folder `natafin-react`:

```bash
cd natafin-react
npm install
npm run mock-api
```

JSON Server berjalan pada port `3001`.

### Menjalankan React + Vite

Buka terminal baru dan masuk ke folder `natafin-react`:

```bash
cd natafin-react
npm run dev
```

Aplikasi React berjalan pada port `5173`.

Ketiga server perlu berjalan bersamaan agar fitur Mock API dan integrasi frontend-backend dapat digunakan.

### Alamat Aplikasi dan API

| Layanan | Alamat |
|---|---|
| React + Vite | `http://localhost:5173` |
| NestJS Backend | `http://localhost:3000` |
| REST API Transactions | `http://localhost:3000/transactions` |
| JSON Server | `http://localhost:3001/transactions` |

## Dokumentasi Screenshot

Dokumentasi pengembangan NataFin disimpan dalam folder `docs/screenshots/` dan dikelompokkan berdasarkan minggu pengerjaan.

```text
docs/screenshots/
├── minggu-2/
├── minggu-3/
├── minggu-4/
├── minggu-5/
├── minggu-6/
├── minggu-7/
├── minggu-9/
└── minggu-10/
```

Dokumentasi meliputi:

- **Minggu 2–4:** Perancangan aplikasi, HTML, CSS, Bootstrap, dan Tailwind.
- **Minggu 5:** Implementasi JavaScript dan jQuery serta pengujian interaktivitas.
- **Minggu 6:** Setup React dengan Vite, struktur komponen, dan tampilan dashboard.
- **Minggu 7:** Pengujian konsumsi Mock API dengan kondisi loading, success, dan error.
- **Minggu 9:** Setup backend NestJS, struktur resource Transactions, pengujian REST API, validasi data, dan integrasi frontend dengan backend.
- **Minggu 10:** Implementasi PostgreSQL, Prisma ORM, migrasi database, pengujian CRUD, persistensi data, serta dokumentasi tampilan desktop dan mobile.

Screenshot disimpan langsung di dalam folder masing-masing minggu dan dapat dilihat melalui repository GitHub.

## Video Demonstrasi

Video demonstrasi interaktivitas NataFin untuk Tugas Minggu 5 tersedia melalui folder Google Drive berikut:

[**Lihat Video Demonstrasi NataFin**](https://drive.google.com/drive/folders/105IiEub5SnkWG1rpdCUArmDDxrm2BUhx?usp=sharing)

Video disimpan dalam folder `Dokumentasi_Web_NataFin` dengan nama file `Demonstrasi_Minggu_5.mp4`.