var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Access = sequelize.define('access',{
    accessId: {type: Sequelize.INTEGER, defaultValue:0, primaryKey:true},
    info: {type: Sequelize.STRING}
},{
    freezeTableName: true
});

module.exports = Access;
