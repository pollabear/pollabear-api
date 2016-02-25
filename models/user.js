var Sequelize = require('sequelize');
var sequelize = require('../sequelize');
//var bcrypt = require('bcryptjs');

var User = sequelize.define('user',{
    //With timestamps set to true, createdAt,updatedAt are automatically created and updated
    userId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: {
	type: Sequelize.STRING,
	required: true, unique: true,
	validate: {
	    isEmail: true
	}
    },
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING,required: true},
    facebook: {type: Sequelize.STRING},
    twitter: {type: Sequelize.STRING},
    google: {type: Sequelize.STRING},
    pollPoints: {type: Sequelize.INTEGER,defaultValue: 0},
    pollsTaken: {type: Sequelize.INTEGER,defaultValue: 0},
    gender: {
	type: Sequelize.INTEGER,
	references: {
	    model: 'sexes',
	    key: 'id'
	}
    }/*,
    age: {
	type: Sequelize.INTEGER,
	references: {
	    model: 'ages',
	    key: 'ageId'
	}
    },
    relationship: {
	type: Sequelize.INTEGER,
	references: {
	    model: 'relationships',
	    key: 'relationshipId'
	}
    }*/
},{
    timestamps: true
});

module.exports = User;


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


