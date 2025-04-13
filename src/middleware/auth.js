const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const jwtConfig = require('../config/jwt');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return errorResponse(res, 'Token tidak ditemukan', {}, 401);
    }

    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        return errorResponse(res, 'Token tidak valid', { detail: err.message }, 403);
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return errorResponse(res, 'Gagal melakukan autentikasi', { detail: err.message });
  }
};

module.exports = {
  authenticateToken,
};
