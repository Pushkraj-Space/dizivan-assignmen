const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnections')

const FeedbackFormMaster = sequelize.define('feedback_form_master', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING(60),
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  mobile: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  feedback_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 1
  },
  feedback_details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  product_service_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  is_active : {
    type : DataTypes.INTEGER,
    allowNull : true
  },
  created_by: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  modified_by: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  modified_on: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'feedback_form_master',
  timestamps: false 
});


module.exports = FeedbackFormMaster;