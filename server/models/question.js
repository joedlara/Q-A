let mongoose = require('mongoose');

let schema = mongoose.Schema;



let QuestionSchema = mongoose.Schema({
	_user: {type: schema.Types.ObjectId, ref: 'User'},
	content: {type: String, minlength: 10},
	description: {type: String},
	answers: [{type: schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true})

mongoose.model('Question', QuestionSchema);