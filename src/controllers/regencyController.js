const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

module.exports = {
  getRegencies: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM regencies_ref');
      return successResponse(res, 'Daftar kabupaten berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting regencies:', err);
      return errorResponse(res, 'Gagal mengambil daftar kabupaten', { detail: err.message });
    }
  },

  createRegency: async (req, res) => {
    const { regency_id, province_id, name } = req.body;
    if (!regency_id || !province_id || !name) {
      return errorResponse(res, 'regency_id, province_id, dan name wajib diisi', {}, 400);
    }

    try {
      await db.execute('INSERT INTO regencies_ref (regency_id, province_id, name) VALUES (?, ?, ?)', [regency_id, province_id, name]);
      return successResponse(res, 'Kabupaten berhasil ditambah', { regency_id, province_id, name }, 201);
    } catch (err) {
      console.error('Error creating regency:', err);
      return errorResponse(res, 'Gagal menambah kabupaten', { detail: err.message });
    }
  },

  getRegency: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM regencies_ref WHERE regency_id = ?', [req.params.id]);
      if (rows.length === 0) {
        return errorResponse(res, 'Kabupaten tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Kabupaten berhasil diambil', rows[0]);
    } catch (err) {
      console.error('Error getting regency:', err);
      return errorResponse(res, 'Gagal mengambil kabupaten', { detail: err.message });
    }
  },

  updateRegency: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return errorResponse(res, 'Nama kabupaten wajib diisi', {}, 400);
    }

    try {
      const [result] = await db.execute('UPDATE regencies_ref SET name = ?, updated_at = NOW() WHERE regency_id = ?', [name, req.params.id]);
      if (result.affectedRows === 0) {
        return errorResponse(res, 'Kabupaten tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Kabupaten berhasil diperbarui', { regency_id: req.params.id, name });
    } catch (err) {
      console.error('Error updating regency:', err);
      return errorResponse(res, 'Gagal memperbarui kabupaten', { detail: err.message });
    }
  },

  deleteRegency: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.execute('UPDATE regencies_ref SET is_active = 0 WHERE regency_id = ?', [id]);

      if (result.affectedRows === 0) {
        return errorResponse(res, 'Kabupaten tidak ditemukan', {}, 404);
      }

      return successResponse(res, 'Kabupaten berhasil dihapus', {});
    } catch (err) {
      console.error('Error deleting regency:', err);
      return errorResponse(res, 'Gagal menghapus kabupaten', { detail: err.message });
    }
  },

  getDistrictsByRegency: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM districts_ref WHERE regency_id = ?', [req.params.regency_id]);
      return successResponse(res, 'Daftar kecamatan berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting districts by regency:', err);
      return errorResponse(res, 'Gagal mengambil daftar kecamatan', { detail: err.message });
    }
  },
};
