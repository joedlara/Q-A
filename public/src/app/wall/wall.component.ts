import { Component, OnInit } from '@angular/core';
import { WallService } from './wall.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
	  currentUser: object = {name: ""};

	  question: object = {content: ""};
    questions: object[] = [];

  	answer: object = {content:""};

    show = "";
    shows: object = {};

  constructor(private _wallService: WallService, private _router: Router) { 
    // this._router.params.subscribe((param)=>{
    //   console.log("WallComponent loaded and url id given is", param.id);
    //   this.wallShow = param.messageId
    // })

  	this._wallService.getCurrentUser()
    .then((data)=>{
      console.log("then");
      this.currentUser = data;
    })
    .catch((error)=>{
      if (error.status == 401){
        this._router.navigate(['/login'])
        
      }
    })
  }

  ngOnInit() {
    this.getCurrentQuestion();
  }

  getCurrentQuestion(){
    this._wallService.getQuestion()
    .then((data)=>{
    console.log("in wall component getCurrentQuestion");
      console.log("then");
      this.questions = data;
      console.log(data);
      this.question = {content: ""};
    })
    .catch((data)=>console.log(data))
  }

  showQuestions(questionId){
    console.log("In wall component show function")
    this._wallService.showQuestion(questionId)
      .then( (data) =>{
        console.log(data);
        this._router.navigate(['question/'+ questionId])
        this.getCurrentQuestion();
      }) 
      .catch( (data) => console.log(data))
  }

  answerQuestion(questionId){
    console.log("In wall component show function")
    this._wallService.answerQuest(questionId)
      .then( (data) =>{
        console.log(data);
        this._router.navigate(['question/'+ questionId + '/new_answer']);
      }) 
      .catch( (data) => console.log(data))
  }

  // current(){
  //   console.log("in wall component currentQuestion");
  //   this._wallService.wallQuestion({show: this.show})
  //   .then((data)=>{
  //     console.log("then");
  //     console.log(data);
  //     this.shows = data
  //     this.getCurrentQuestion();
  //   })
  //   .catch((data)=>console.log(data))
  // }


}












