var controller = require('./../controllers/controller');
var path = require('path');
var app = require('express')

function authenticate(req, res, next){
	if(req.session.userId){
		next();
	}else{
		res.sendStatus(401);
	}
}

module.exports = function(app){

	app.post('/api/users', controller.createUser)
	app.get('/wall', function(req,res, next){
		res.sendFile(path.resolve('./public/dist/index.html'))
	})
	app.get('/login', function(req,res, next){
		res.sendFile(path.resolve('./public/dist/index.html'))
	})

	app.use(authenticate);


	app.post('/api/findCurrentQuestion', controller.findCurrentQuestion)


	app.post('/api/answers/', controller.createAnswer)
	app.post('/api/questions', controller.createQuestion)
	app.post('/api/currentQuestion', controller.allQuestions)
	app.post('/api/current_question', controller.getCurrentQuestion)

	app.post('/api/like', controller.like)


	app.get('/api/answer/:id', controller.answerOneQuestion)
	app.get('/api/show/:id', controller.showQuestion)
	app.get('/api/shows/:id', controller.questionShow)
	app.get('/api/current_user', controller.getCurrent)
	app.get('/api/question', controller.index)
	
}
