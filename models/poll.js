var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Choice = require('./choice');

var Poll = mongoose.model('Poll', new Schema({
    creator_id: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    choices: [Choice],
    votes: { type: Number, default: 0 },
    category: Number,
    tags: { type: [String], index: true }, // field level
    reported: { type: Number, default: 0 },
    choiceType: String,

    // privacy: type: Number,
    // authenticated: array of user ids

    // Comments?

    // Location?

    // Response buckets

    created: { type: Date, default: Date.now },
    meta: {
    	image_url: String,
    	link: String
  	}
}));

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


