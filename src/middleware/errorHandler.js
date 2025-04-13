module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: err.code === 'credentials_required' ? 'Token tidak ada' : 'Token tidak valid atau kadaluarsa',
      error: {},
    });
  }

  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
    error: { detail: err.message },
  });
};
