const qeCode = require('qrcode');

module.exports.generateQr = async (req, res) => {
    try{

    }catch(error){
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}