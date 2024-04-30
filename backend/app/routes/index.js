const router = require('express').Router();

const qrCodeRoutes = require('./qrCodeRoutes');

router.use('/qr', qrCodeRoutes)

module.exports = router;