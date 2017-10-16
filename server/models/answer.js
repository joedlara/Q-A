let mongoose = require('mongoose');
let schema = mongoose.Schema;


let AnswerSchema = mongoose.Schema({
	_user: {type: schema.Types.ObjectId, ref: 'User'},
	content: {type: String, minlength: 5},
	support: {type: String},
	likes: [{type: schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})


mongoose.model('Answer', AnswerSchema)