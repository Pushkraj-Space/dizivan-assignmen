const qeCode = require('qrcode');
const sequelize = require('../../config/dbConnections')

module.exports.getAllSubmissions = async (req, res) => {
    try{

    }catch(error){
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}

module.exports.submitFeedback = async (req, res) => {
    try{

    }catch(error){
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}