require('dotenv').config();

const jwtConfig = {
  secretKey: process.env.JWT_SECRET || 'your-secret-key-here',
  options: {
    expiresIn: '24h',
  },
};

module.exports = jwtConfig;
