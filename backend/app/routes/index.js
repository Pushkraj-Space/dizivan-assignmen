const router = require('express').Router();

const qrCodeRoutes = require('./qrCodeRoutes');
const formRoutes = require('./formRoutes');

router.use('/qr', qrCodeRoutes)
router.use('/form', formRoutes)

module.exports = router;