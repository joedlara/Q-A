import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: object = {content: "", description: ""};
  
  questions: object[] = [];

  errors: string[] = [];


  constructor(private _questionService: QuestionService, private _router: Router) { }

  ngOnInit() {
  }

  newQuestion(){
  	console.log("In wall component newQuestion");
  	this._questionService.createdQuestion(this.question)
  	.then((data)=> {
  		console.log("then");
  		console.log(data);
      if(data.errors){
        console.log("there were validation errors");
        var errArr = [];
        for(var key in data.errors){
          errArr.push(data.errors[key].question);
        }
        this.errors = errArr;
      }else{

  		  this._router.navigate([''])
      }

  	})
  	.catch((data)=> console.log(data))
  }








}















