const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

module.exports = {
  getVillages: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM villages_ref');
      return successResponse(res, 'Daftar desa berhasil diambil', rows);
    } catch (err) {
      console.error('Error getting villages:', err);
      return errorResponse(res, 'Gagal mengambil daftar desa', { detail: err.message });
    }
  },

  createVillage: async (req, res) => {
    const { village_id, district_id, name } = req.body;
    if (!village_id || !district_id || !name) {
      return errorResponse(res, 'village_id, district_id, dan name wajib diisi', {}, 400);
    }

    try {
      await db.execute('INSERT INTO villages_ref (village_id, district_id, name) VALUES (?, ?, ?)', [village_id, district_id, name]);
      return successResponse(res, 'Desa berhasil ditambah', { village_id, district_id, name }, 201);
    } catch (err) {
      console.error('Error creating village:', err);
      return errorResponse(res, 'Gagal menambah desa', { detail: err.message });
    }
  },

  getVillage: async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM villages_ref WHERE village_id = ?', [req.params.id]);
      if (rows.length === 0) {
        return errorResponse(res, 'Desa tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Desa berhasil diambil', rows[0]);
    } catch (err) {
      console.error('Error getting village:', err);
      return errorResponse(res, 'Gagal mengambil desa', { detail: err.message });
    }
  },

  updateVillage: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return errorResponse(res, 'Nama desa wajib diisi', {}, 400);
    }

    try {
      const [result] = await db.execute('UPDATE villages_ref SET name = ?, updated_at = NOW() WHERE village_id = ?', [name, req.params.id]);
      if (result.affectedRows === 0) {
        return errorResponse(res, 'Desa tidak ditemukan', {}, 404);
      }
      return successResponse(res, 'Desa berhasil diperbarui', { village_id: req.params.id, name });
    } catch (err) {
      console.error('Error updating village:', err);
      return errorResponse(res, 'Gagal memperbarui desa', { detail: err.message });
    }
  },

  deleteVillage: async (req, res) => {
    try {
      const { id } = req.params;
      const [result] = await db.execute('UPDATE villages SET is_active = 0 WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Desa tidak ditemukan',
          error: {},
        });
      }

      return res.json({
        success: true,
        message: 'Desa berhasil dihapus',
        data: {},
      });
    } catch (error) {
      console.error('Error saat menghapus desa:', error);
      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus desa',
        error: { detail: error.message },
      });
    }
  },
};
