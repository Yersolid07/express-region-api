const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/response');
const jwtConfig = require('../config/jwt');

// Dummy users untuk testing
const users = [{ id: 1, username: 'admin', password: 'admin123' }];

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return errorResponse(res, 'Username dan password wajib diisi', {}, 400);
    }

    // Cari user
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      return errorResponse(res, 'Username atau password salah', {}, 401);
    }

    // Generate token
    const token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.secretKey, jwtConfig.options);

    return successResponse(res, 'Login berhasil', { token });
  } catch (err) {
    console.error('Login error:', err);
    return errorResponse(res, 'Gagal melakukan login', { detail: err.message });
  }
};

const logout = async (req, res) => {
  try {
    // Di implementasi nyata, di sini bisa ditambahkan logika untuk blacklist token
    return successResponse(res, 'Logout berhasil', {});
  } catch (err) {
    console.error('Logout error:', err);
    return errorResponse(res, 'Gagal melakukan logout', { detail: err.message });
  }
};

module.exports = {
  login,
  logout,
};
