const qeCode = require('qrcode');
const sequelize = require('../../config/dbConnections');
const FeedbackFormMaster = require('../models/FeedbackFormMaster');
const { Op } = require('sequelize');

module.exports.getAllSubmissions = async (req, res) => {
    try{
        let { page = '1', status = '' } = req.query;
        page = parseInt(page.trim());
        let offset = (+page - 1) * 8;
        let whereClause = {
            is_active : 1
        }
        if(status != ''){
            whereClause.feedback_type = status
        }
        const payload = await FeedbackFormMaster.findAll({
            attributes : ['id', 'name', 'email', 'mobile', 'feedback_type', 'feedback_details', 'product_service_name', 'created_on'],
            where : whereClause,
            offset,
        });
        const count =  await FeedbackFormMaster.count({
            whereClause
        })
        
        return res.status(200).json({ status: true, total : count, payload})
    }catch(error){
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}

module.exports.getDashboardAnalysis = async (req, res) => {
    try{
        const { time } = req.query;
        let today = new Date();
        let startDate;
        let allTime = false;

        if (time === "today") {
            startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );
        } else if (time === "weekly") {
            startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - today.getDay()
            );
        } else if (time === "monthly") {
            startDate = new Date(today.getFullYear(), today.getMonth());
        } else if (time === "total") {
            allTime = true;
        }
        let whereClause = {
            is_active : 1
        }
        if(allTime == false){
            whereClause.created_on = {
                [Op.gte]: startDate,
            }
        }

        const payload = await FeedbackFormMaster.findAll({
            attributes: ['feedback_type', [sequelize.fn('COUNT', 'feedback_type'), 'count']],
            group: ['feedback_type'],
            order : [['count', 'DESC']],
            where : whereClause
        });

        return res.status(200).json({ status: true, payload})
    }catch(error){
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}

module.exports.submitFeedback = async (req, res) => {
    const transaction = await sequelize.transaction({ autocommit : false})
    try{
        const {
            name,
            email,
            mobile,
            feedback_type,
            feedback_details,
            product_service_name
        } = req.body;

        await FeedbackFormMaster.create({
            name,
            email,
            mobile,
            feedback_type,
            feedback_details,
            product_service_name,
            is_active : 1,
        },{
            transaction
        })
        await transaction.commit();
        return res.status(201).json({ status: true, message : "Form submitted successfully"})
    }catch(error){
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ status : false, message : 'Internal server error'})
    }
}