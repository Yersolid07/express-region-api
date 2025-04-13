# API Wilayah Indonesia

API untuk mengelola data wilayah administratif Indonesia, termasuk Provinsi, Kabupaten/Kota, Kecamatan, dan Desa/Kelurahan.

## Teknologi yang Digunakan

- Node.js
- Express.js
- MySQL
- JWT untuk autentikasi
- CORS enabled

## Instalasi

1. Clone repository ini
2. Install dependencies:

```bash
npm install
```

3. Buat file `.env` dengan konfigurasi berikut:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=wilayah-db
JWT_SECRET=your_jwt_secret_key
```

4. Jalankan aplikasi:

```bash
npm run dev
```

## Endpoints API

### Autentikasi

#### Login

- **URL**: `/api/v1/auth/login`
- **Method**: POST
- **Body**:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

- **Response**:

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "jwt_token_here"
  }
}
```

### Provinsi

#### Mendapatkan Semua Provinsi

- **URL**: `/api/v1/provinces`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Provinsi by ID

- **URL**: `/api/v1/provinces/:id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Membuat Provinsi Baru

- **URL**: `/api/v1/provinces`
- **Method**: POST
- **Headers**: `Authorization: Bearer your_token`
- **Body**:

```json
{
  "province_id": "11",
  "name": "Aceh"
}
```

#### Mengupdate Provinsi

- **URL**: `/api/v1/provinces/:id`
- **Method**: PATCH
- **Headers**: `Authorization: Bearer your_token`
- **Body**:

```json
{
  "name": "Nanggroe Aceh Darussalam"
}
```

#### Menghapus Provinsi (Soft Delete)

- **URL**: `/api/v1/provinces/:id`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer your_token`

### Kabupaten/Kota

#### Mendapatkan Semua Kabupaten

- **URL**: `/api/v1/regencies`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Kabupaten by ID

- **URL**: `/api/v1/regencies/:id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Kabupaten by Provinsi ID

- **URL**: `/api/v1/regencies/province/:province_id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Membuat Kabupaten Baru

- **URL**: `/api/v1/regencies`
- **Method**: POST
- **Headers**: `Authorization: Bearer your_token`
- **Body**:

```json
{
  "regency_id": "1101",
  "province_id": "11",
  "name": "Kabupaten Simeulue"
}
```

### Kecamatan

#### Mendapatkan Semua Kecamatan

- **URL**: `/api/v1/districts`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Kecamatan by ID

- **URL**: `/api/v1/districts/:id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Kecamatan by Kabupaten ID

- **URL**: `/api/v1/districts/regency/:regency_id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

### Desa/Kelurahan

#### Mendapatkan Semua Desa

- **URL**: `/api/v1/villages`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Desa by ID

- **URL**: `/api/v1/villages/:id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

#### Mendapatkan Desa by Kecamatan ID

- **URL**: `/api/v1/villages/district/:district_id`
- **Method**: GET
- **Headers**: `Authorization: Bearer your_token`

## Catatan Penting

1. Semua endpoint kecuali login memerlukan JWT token dalam header Authorization
2. Format token: `Bearer your_token_here`
3. Operasi DELETE menggunakan soft delete (mengubah is_active menjadi 0)
4. Semua response menggunakan format standar:

```json
{
    "success": true/false,
    "message": "Pesan response",
    "data": {} // Data atau error detail
}
```

## Error Handling

API ini menangani berbagai jenis error:

- 400: Bad Request (input tidak valid)
- 401: Unauthorized (token tidak valid/expired)
- 404: Not Found (data tidak ditemukan)
- 500: Internal Server Error

## Pengembangan

Untuk menjalankan dalam mode development:

```bash
npm run dev
```

## Lisensi

MIT License
