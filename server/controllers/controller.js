var mongoose = require('mongoose');
var Question = mongoose.model('Question')
var User = mongoose.model('User')
var Answer = mongoose.model('Answer')


module.exports = {
	createUser: function(req,res){
		console.log("in users controller's createUser method");
	
		User.findOne(req.body).exec(function(err, foundUser){

			if(foundUser){
				console.log("user in db")
				req.session.userId = foundUser._id;
				res.json(foundUser);
			}else{
				var newUser = new User(req.body);
				newUser.save(function(err,savedUser){
					if(err){
						console.log("something went wrong");
						res.json(err);
					}else{
						console.log("created user");
						req.session.userId = savedUser._id;
						res.json(savedUser);
					}
				})
			}
		})
	},


	getCurrent: function(req,res){
		console.log("in users controller's getCurrent method");
		User.findOne({_id: req.session.userId}).exec(function(err, foundUser){
			if(err){
				console.log('something went wrong');
				res.json(err);
			}else{
				console.log("found current user");
				// console.log(foundUser);
				res.json(foundUser);
			}
		})
	},

	getCurrentQuestion: function(req,res){
		console.log("in users controller's getCurrentQuestion method");
		Question.findOne({_id: req.body.questionid}).exec(function(err, foundQuestion){
			console.log(foundQuestion,"**********************************")
			if(err){
				console.log('something went wrong');
				res.json(err);
			}else{
				console.log("found current question");
				// console.log(foundQuestion);
				res.json(foundQuestion);
			}
		})
	},

	index: function(req,res){
		console.log("in the messages controller's index method");
		Question.find({}).populate({path:'_user'}).populate({path:'answers', model:'Answer', populate:{path:'_user', model:'User'}})
		.exec(function(err, questions){
			if(err){
				console.log("something went wrong in index");
				res.json(err);
			}else{
				console.log("show all questions is working");
				// console.log(questions);
				res.json(questions);
			}
		})
	},

	createQuestion: function(req, res){
		console.log("In the questions controller createQuestion method")
		var newQuestion = new Question(req.body);
		newQuestion.like = 0;
		newQuestion._user = req.session.userId;
		newQuestion.save(function(err, savedQuestion){
			if(err){
				console.log(req.body, "*********************************")
				console.log("something went wrong trying to creating a question");
				res.json(err);
			}else{
				console.log("question was saved");
				// console.log(newQuestion);
				res.json(newQuestion);
			}
		})

	},

	createAnswer: function(req, res){
		console.log("entering createAnswer");
		Question.findOne({_id: req.body.questionId}).exec(function(err, question){
			if(err){
				console.log("not working there is an error");
				res.json(err);
			}else{
				console.log("found question creating answer");
				// console.log(question);
				var newAnswer = new Answer;
				newAnswer._user = req.session.userId;
				newAnswer.content = req.body.content;
				newAnswer.support = req.body.description;
				newAnswer.save(function(err){
					if(err){
						console.log("something went wrong");
						res.json(err);
					}else{
						console.log("created answer");
						question.answers.push(newAnswer._id);
						question.save(function(err){
							if(err){
								console.log("something went wrong trying to save the answer");
								res.json(err);
							}else{
								console.log("answer was saved with the new answer");
								res.json(question);
							}
						})
					}
				}) 
			}
		})

	},

	showQuestion: function(req, res){
		Question.findOne({ _id: req.params.id}, function(err, question){
			if(err){
				console.log("something went wrong trying to show question");
				res.json(err);
			}else{
				console.log("You are showing the question");
				res.json({content: "show current question"})
			}
			
		})
	},

	questionShow: function(req, res){
		Question.findOne({ _id: req.params.id}, function(err, question){
			if(err){
				console.log("something went wrong trying to show question");
				res.json(err);
			}else{
				console.log("You are showing the question");
				res.json({content: "show current question"})
			}
			
		})
	},


	answerOneQuestion: function(req, res){
		Question.findOne({ _id: req.params.id}, function(err, question){
			if(err){
				console.log("something went wrong trying to answer question in answerOneQuestion");
				res.json(err);
			}else{
				console.log("You are answering the question");
				res.json({content: "answer current question"})
			}
			
		})
	},

	allQuestions: function(req, res){
		console.log("In users controller allQuestions method");
		Question.find({}).populate({path:'_user'}).populate({path:'answers', model:'Answer', populate:{path:'_user', model:'User'}})
		.exec(function(err, foundCurrent){
			if(err){
				console.log("something went wrong");
				res.json(err);
			}else{
				console.log("found current questions");
				console.log(foundCurrent);
				res.json(foundCurrent);
			}
		})
	},


	findCurrentQuestion: function(req,res){
		console.log("In controller findCurrentQuestion function");
		console.log(req.body);
		Question.findOne({_id: req.body.show}).populate({path:'_user'}).populate({path:'answers', model:'Answer', populate:{path:'_user', model:'User'}})
		.exec(function(err, foundCurrentQuestion){
			// console.log(foundCurrentQuestion, "*********************************0000")
			if(err){
				console.log("something went wrong finding current Question");
				res.json(err);
			}else{
				console.log("1")
				console.log("found the current question");
				// console.log(foundCurrentQuestion, "*****************************"),
				res.json(foundCurrentQuestion)
			}
		})

	},

	like: function(req, res){
		console.log(req.body.idAnswer);
		Answer.findOne({_id: req.body.idAnswer})
		.exec(function(err, answers) {
			var number = answers.likes.length
			console.log(req.session.userId,"))))))))))))))))))))))");
			console.log(answers.likes.length,"&&&&&&&&&&&&&&&&&&&&&&&&&&&")
			console.log(number, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
			if(answers.likes.length >= 1){
				for(var i=0; i<answers.likes.length; i++){
					// console.log("something crazy");
					if(answers.likes[i]==req.session.userId){
						// console.log(answers.likes, "!!!!!!!!!!!!!!!!!");
						answers.likes.splice(i,1);
						// console.log(answers.likes, "@@@@@@@@@@@@@@@@@@@");
						answers.save(function(err){
							if(err){
								console.log("something went wrong");
								res.json(err);
							}else{
								console.log("2")
								res.json(answers);
							}

						})
					}
				} 

				if(number == answers.likes.length){
					console.log("3", "*********************");
				answers.likes.push(req.session.userId);
				answers.save(function(err){
					if(err){
						console.log("4+++++++++++++++++++++++++")
						res.json(err);
					}else{
						console.log("5%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
						res.json("it worked on like")
					}
				})
				}

			 
			}
			 else if(answers.likes.length == 0){
				console.log("3", "*********************");
				answers.likes.push(req.session.userId);
				answers.save(function(err){
					if(err){
						console.log("4+++++++++++++++++++++++++")
						res.json(err);
					}else{
						console.log("5%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
						res.json("it worked on like")
					}
				})
			} 
		})
	},


			// console.log(answers.likes.length,">>>>>>>>>>>>>>>>>>>>>>>>>");
			// console.log(number,"<<<<<<<<<<<<<<<<<<<<<<<,,<<<<<<<<");
	
}












