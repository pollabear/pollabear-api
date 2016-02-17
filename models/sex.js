var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Sex = sequelize.define('sex',{
    id: {type: Sequelize.INTEGER, primaryKey: true},
    string: {type: Sequelize.STRING, required: true}
});
module.exports = Sex;
