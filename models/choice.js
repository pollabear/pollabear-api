var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Choice = new Schema({ 
	text: String,
    votes: { type: Number, default: 0 },
	demographicData: {
        
	// 	sex: {

	// 	}
	// 	age: {

	// 	}
	// 	sexual_orientation
	// 	political_affiliation
	// 	education
	// 	religion
	// 	employment
	// 	ethnicity 
	// 	relationship 
	// 	residence
	},
	meta: {
    	image_url: String,
    	link: String
  	}
});

module.exports = Choice;