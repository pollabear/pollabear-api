var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User = new Schema({
    email: {
        type:String,
        required: true
    },
    username: String,
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    facebook: String,
    twitter: String,
    google: String,
    // pollabear: {
    //     // info regarding dressing up bear goes here
    // }
    pollPoints: { type: Number, default: 0 },
    pollsTaken: { type: Number, default: 0 },
    demographics: {
    	gender: Number,
    	age: Number,
    	sexual_orientation: Number,
    	political_affiliation: Number,
    	education: Number,
    	religion: Number,
    	employment: Number,
    	ethnicity: Number,
    	relationship: Number,
    	residence: Number
    },
    polls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
    tracked: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
    created: { type: Date, default: Date.now }
});


User.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', User);


/*

sex
	Male
	Female
	Other

age
    Under 12 years old
    12-17 years old
    18-24 years old
    25-34 years old
    35-44 years old
    45-54 years old
    55-64 years old
    65 years or older

sexual_orientation
    heterosexuality 
    homosexuality
    bisexuality
    other

party_affiliation
	Republican
	Democrat
	Independent 
    Other
    None
    
education
    High School or less
    Some College
    College Graduate
    Post-Graduate Degree
    Other

religion
	Christianity
	No religion
	Judaism
	Islam
	Hinduism
	Other

employment
    Employed
    Unemployed
    Student
    Retired
    Military
    Other

ethnicity 
    Asian
    Black
    Latino
    Native American
    White
    Other

relationship 
    Single
    Dating
    Married
    Other

 residence
 	urban
 	rural
 	suburb

*/


