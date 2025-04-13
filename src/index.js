const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const provinceRoutes = require('./routes/provinceRoutes');
const regencyRoutes = require('./routes/regencyRoutes');
const districtRoutes = require('./routes/districtRoutes');
const villageRoutes = require('./routes/villageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Selamat datang di API Wilayah Indonesia',
    endpoints: {
      auth: {
        login: 'POST /api/v1/auth/login',
        logout: 'POST /api/v1/auth/logout',
      },
      provinces: {
        list: 'GET /api/v1/provinces',
        create: 'POST /api/v1/provinces',
        getById: 'GET /api/v1/provinces/:id',
        update: 'PATCH /api/v1/provinces/:id',
        delete: 'DELETE /api/v1/provinces/:id',
        getRegencies: 'GET /api/v1/provinces/:province_id/regencies',
      },
      regencies: {
        list: 'GET /api/v1/regencies',
        create: 'POST /api/v1/regencies',
        getById: 'GET /api/v1/regencies/:id',
        update: 'PATCH /api/v1/regencies/:id',
        delete: 'DELETE /api/v1/regencies/:id',
        getDistricts: 'GET /api/v1/regencies/:regency_id/districts',
      },
      districts: {
        list: 'GET /api/v1/districts',
        create: 'POST /api/v1/districts',
        getById: 'GET /api/v1/districts/:id',
        update: 'PATCH /api/v1/districts/:id',
        delete: 'DELETE /api/v1/districts/:id',
        getVillages: 'GET /api/v1/districts/:district_id/villages',
      },
      villages: {
        list: 'GET /api/v1/villages',
        create: 'POST /api/v1/villages',
        getById: 'GET /api/v1/villages/:id',
        update: 'PATCH /api/v1/villages/:id',
        delete: 'DELETE /api/v1/villages/:id',
      },
    },
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/provinces', provinceRoutes);
app.use('/api/v1/regencies', regencyRoutes);
app.use('/api/v1/districts', districtRoutes);
app.use('/api/v1/villages', villageRoutes);

// Error handling untuk rute yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan',
    error: {},
  });
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
