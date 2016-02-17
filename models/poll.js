var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Poll = sequelize.define('poll',{
    pollId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.TEXT},
    voteCount: {type: Sequelize.INTEGER, defaultValue:0},
    creator: {
	type: Sequelize.INTEGER,
	references: {
	    model: 'users',
	    key: 'userId'
	}
    },
    category: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'categories',
	    key: 'categoryId'
	}
    },
    access: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'access',
	    key: 'accessId'
	},
	defaultValue: 0
    }
    
},{
    timestamps: true
});


module.exports = Poll;

/*

Categories
    
    Misc

    Politics

    Business

    Music

    Games

    Fashion

    Sports

    Social

    Travels

    Funny

    Lifestyle

    Food

    Entertainment

    Technology

    Science

    Health	

*/


