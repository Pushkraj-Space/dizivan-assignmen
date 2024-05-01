const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STRING}`, {
    logging : false
}) 

sequelize
  .authenticate()
  .then(() => console.log("Connected to database"))
   .catch((err) => console.error("Connection error", err.stack));
   
sequelize.sync({ force : false  })
    .then(() => {
        console.log('Database & tables synced');
    });

module.exports = sequelize;