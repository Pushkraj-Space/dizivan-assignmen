const router = require('express').Router();

const qrCodeContorller = require('../controllers/qrCodeController');

router.use('/qr', qrCodeContorller.generateQr)

module.exports = router;