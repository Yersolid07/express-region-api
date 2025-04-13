const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

module.exports = {
  getProvinces: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM provinces_ref');
      return successResponse(res, 'Daftar provinsi berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting provinces:', err);
      return errorResponse(res, 'Gagal mengambil daftar provinsi', { detail: err.message });
    }
  },

  createProvince: async (req, res) => {
    const { province_id, name } = req.body;
    if (!province_id || !name) {
      return errorResponse(res, 'province_id dan name wajib diisi', {}, 400);
    }

    try {
      await db.execute('INSERT INTO provinces_ref (province_id, name) VALUES (?, ?)', [province_id, name]);
      return successResponse(res, 'Provinsi berhasil ditambah', { province_id, name }, 201);
    } catch (err) {
      console.error('Error creating province:', err);
      return errorResponse(res, 'Gagal menambah provinsi', { detail: err.message });
    }
  },

  getProvince: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM provinces_ref WHERE province_id = ?', [req.params.id]);
      if (rows.length === 0) {
        return errorResponse(res, 'Provinsi tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Provinsi berhasil diambil', rows[0]);
    } catch (err) {
      console.error('Error getting province:', err);
      return errorResponse(res, 'Gagal mengambil provinsi', { detail: err.message });
    }
  },

  updateProvince: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return errorResponse(res, 'Nama provinsi wajib diisi', {}, 400);
    }

    try {
      const [result] = await db.execute('UPDATE provinces_ref SET name = ?, updated_at = NOW() WHERE province_id = ?', [name, req.params.id]);
      if (result.affectedRows === 0) {
        return errorResponse(res, 'Provinsi tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Provinsi berhasil diperbarui', { province_id: req.params.id, name });
    } catch (err) {
      console.error('Error updating province:', err);
      return errorResponse(res, 'Gagal memperbarui provinsi', { detail: err.message });
    }
  },

  deleteProvince: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.execute('UPDATE provinces SET is_active = 0 WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Provinsi tidak ditemukan',
          error: {},
        });
      }

      return res.json({
        success: true,
        message: 'Provinsi berhasil dihapus',
        data: {},
      });
    } catch (error) {
      console.error('Error saat menghapus provinsi:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus provinsi',
        error: { detail: error.message },
      });
    }
  },

  getRegenciesByProvince: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM regencies_ref WHERE province_id = ?', [req.params.province_id]);
      return successResponse(res, 'Daftar kabupaten berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting regencies by province:', err);
      return errorResponse(res, 'Gagal mengambil daftar kabupaten', { detail: err.message });
    }
  },
};
