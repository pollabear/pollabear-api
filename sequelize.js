var Sequelize = require('sequelize');
var db = new Sequelize('pollabear','app_use','app_use',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});
module.exports = db;
