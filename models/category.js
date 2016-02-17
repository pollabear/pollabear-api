var Sequelize = require('sequelize');
var sequelize = require ('../sequelize');

var Category = sequelize.define('category',{
    categoryId: {type: Sequelize.INTEGER, primaryKey:true},
    categoryString: {type: Sequelize.STRING}
});

module.exports = Category;
