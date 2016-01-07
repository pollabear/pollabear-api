module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'JWTTokenSecret',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://jpkramer:)boe)boe@ds063833.mongolab.com:63833/pollabear',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'e699c729e391b7403a4427c2ca23b6bd',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || '',
  TWITTER_SECRET: process.env.TWITTER_SECRET || ''
};