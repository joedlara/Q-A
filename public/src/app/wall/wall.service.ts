import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class WallService {

  constructor(private _http:Http) { }

	getCurrentUser(){
	console.log("in service's getCurrentUser");
	return this._http.get('/api/current_user')
	.map((response)=>response.json())
	.toPromise()
  }
  getQuestion(){
  	console.log("in service's getCurrentMessages");
  	return this._http.get('/api/question')
  	.map((response)=>response.json())
  	.toPromise()
  }

  showQuestion(questionId){
    console.log("in wall service showQuestion");
    return this._http.get('/api/show/'+ questionId)
    .map((response)=>response.json())
    .toPromise()
  }

  answerQuest(questionId){
    console.log("in wall service answerQuestion");
    return this._http.get('/api/answer/'+ questionId)
    .map((response)=>response.json())
    .toPromise()
  }

  // wallQuestion(currentQuestion){
  //   console.log("in service's showMessage");
  //   return this._http.post('/api/currentQuestion', currentQuestion)
  //   .map((response)=>response.json())
  //   .toPromise()
  // }

}
