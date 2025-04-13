const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

module.exports = {
  getDistricts: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM districts_ref');
      return successResponse(res, 'Daftar kecamatan berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting districts:', err);
      return errorResponse(res, 'Gagal mengambil daftar kecamatan', { detail: err.message });
    }
  },

  createDistrict: async (req, res) => {
    const { district_id, regency_id, name } = req.body;
    if (!district_id || !regency_id || !name) {
      return errorResponse(res, 'district_id, regency_id, dan name wajib diisi', {}, 400);
    }

    try {
      await db.execute('INSERT INTO districts_ref (district_id, regency_id, name) VALUES (?, ?, ?)', [district_id, regency_id, name]);
      return successResponse(res, 'Kecamatan berhasil ditambah', { district_id, regency_id, name }, 201);
    } catch (err) {
      console.error('Error creating district:', err);
      return errorResponse(res, 'Gagal menambah kecamatan', { detail: err.message });
    }
  },

  getDistrict: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM districts_ref WHERE district_id = ?', [req.params.id]);
      if (rows.length === 0) {
        return errorResponse(res, 'Kecamatan tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Kecamatan berhasil diambil', rows[0]);
    } catch (err) {
      console.error('Error getting district:', err);
      return errorResponse(res, 'Gagal mengambil kecamatan', { detail: err.message });
    }
  },

  updateDistrict: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return errorResponse(res, 'Nama kecamatan wajib diisi', {}, 400);
    }

    try {
      const [result] = await db.execute('UPDATE districts_ref SET name = ?, updated_at = NOW() WHERE district_id = ?', [name, req.params.id]);
      if (result.affectedRows === 0) {
        return errorResponse(res, 'Kecamatan tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Kecamatan berhasil diperbarui', { district_id: req.params.id, name });
    } catch (err) {
      console.error('Error updating district:', err);
      return errorResponse(res, 'Gagal memperbarui kecamatan', { detail: err.message });
    }
  },

  deleteDistrict: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.execute('UPDATE districts_ref SET is_active = 0 WHERE district_id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Kecamatan tidak ditemukan',
          error: {},
        });
      }

      return res.json({
        success: true,
        message: 'Kecamatan berhasil dihapus',
        data: {},
      });
    } catch (error) {
      console.error('Error saat menghapus kecamatan:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus kecamatan',
        error: { detail: error.message },
      });
    }
  },

  getVillagesByDistrict: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM villages_ref WHERE district_id = ?', [req.params.district_id]);
      return successResponse(res, 'Daftar desa berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting villages by district:', err);
      return errorResponse(res, 'Gagal mengambil daftar desa', { detail: err.message });
    }
  },
};
