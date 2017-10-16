import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answer.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
    currentQuestion: object = {content: ""};
	  answer = {content: "", description: ""};
  	answers: object[] = [];
    errors: string[] = [];

    show = "";
  // shows: object[] = []
    shows: object = {}

  constructor(private _answerService: AnswerService, private _router: Router, private _routes: ActivatedRoute) { 
    this._routes.params.subscribe((param)=>{
      console.log("AnswerComponent loaded and url id given is: ", param.questionId);
      this.show = param.questionId;

    }) 
    this._answerService.getCurrentQuestion({questionid: this.show})
    .then((data)=>{
      console.log("then");
      this.currentQuestion = data;
    })
    .catch((error)=>{
      if (error.status == 401){
        this._router.navigate([''])
        
      }
    })

  }


  ngOnInit() {

  }

  newAnswer(){
  	console.log("In answer component newAnswer");
  	this._answerService.createAnswer({content: this.answer.content, description: this.answer.description, questionId: this.show})
  	.then((data)=> {
  		console.log("then");
  		console.log(data);
      // this.answer={}
      if(data.errors){
        console.log("There were validation errors")
        var errArr = [];
        for(var key in data.errors){
          errArr.push(data.errors[key].answer);
        }
        this.errors = errArr;
      }else{
        this._router.navigate(['']) 
      }

  	})
  	.catch((data)=> console.log(data))
  }

  goQuestion(questionId){
    console.log("in answer component goQuestion function");
    this._answerService.showQuestion(questionId)
    .then((data)=> {
      console.log(this.show);
      this._router.navigate(['question/'+this.show])
    })
    .catch((data)=> this._router.navigate(['question/'+this.show]))
    // .catch((data)=> console.log(data))

  }




}
