let mongoose = require('mongoose');

let schema = mongoose.Schema;

let UserSchema = mongoose.Schema({
	name: {type: String, minlength: 3},
	
}, {timestamps: true})

mongoose.model('User', UserSchema)
