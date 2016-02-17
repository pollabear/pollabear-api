var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = mongoose.model('Comment', new Schema({
    poll_id: {type: Schema.Types.ObjectId, ref: 'Poll'},
    author_id: {type: Schema.Types.ObjectId, ref: 'User'},
    text: String,
    posted: { type: Date, default: Date.now},
    
}));
