var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Response = mongoose.model('Response', new Schema({
    responder_id: { type: Schema.Types.ObjectId, ref: 'User' },
    polla_id: { type: Schema.Types.ObjectId, ref: 'Poll' },
    choice_id: { type: Schema.Types.ObjectId, ref: 'Choice' },
    reasoning: String,
    votes: Number,
    // voter array
    // buckets!!!
    created: { type: Date, default: Date.now }
}));

module.exports = Response;