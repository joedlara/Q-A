import { Component, OnInit } from '@angular/core';
import { ShowService } from './show.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

	show = "";
	// show: object[] = []
	shows: object = {}

  answer: object = {content: ""};
  
  answers: object[] = [];


  constructor(private _showService: ShowService, private _router: ActivatedRoute) { 
  	this._router.params.subscribe((param)=>{
      console.log("ShowComponent loaded and url id given is: ", param.id);
      this.show = param.questionId;

    }) 
  }

  ngOnInit() {
    this.getCurrentQuestion();
    // this.getCurrentAnswer();
 
  }

  getCurrentQuestion(){
    console.log("in show component getCurrentQuestion");
    this._showService.showCurrentQuestion({show: this.show})
    .then((data)=>{
      console.log("then");
      console.log(data);
      this.shows = data 
    })
    .catch((data)=> console.log(data))
  }

  likes(answerId){
    console.log(answerId);
    this._showService.likeAnswer({idAnswer: answerId})
    .then((data) =>{
      console.log("In wall component likes");
      this.getCurrentQuestion();
    })
    .catch((data)=> console.log(data))

  }

  

  

}










