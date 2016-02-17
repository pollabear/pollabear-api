var Sequelize = require('sequelize');
var sequelize = require('../sequelize');

var Vote = sequelize.define('vote',{
    userId: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'users',
	    key: 'userId'
	}
    },
    pollId: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'polls',
	    key: 'pollId'
	}
    },
    choiceId: {
	type: Sequelize.INTEGER,
	references:{
	    model: 'choices',
	    key: 'choiceId'
	}
    },
    genderId: {
	type: Sequelize.INTEGER,
	references:{
	    model:'sexes',
	    key: 'id'
	}
    }
});
module.exports = Vote;
