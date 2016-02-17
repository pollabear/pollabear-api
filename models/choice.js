var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Choice = sequelize.define('choice',{
    choiceId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    pollId: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'polls',
	    key: 'pollId'
	}
    },
    voteCount: {type: Sequelize.INTEGER, defaultValue:0},
    choiceText: {type: Sequelize.TEXT}
},{
    timestamps: false
});

module.exports = Choice;
