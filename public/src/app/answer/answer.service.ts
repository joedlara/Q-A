import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class AnswerService {

  constructor(private _http:Http) { }

  createAnswer(newAnswer){
  	console.log("In services createdQuestion function");
  	return this._http.post('api/answers/', newAnswer)
  	.map((response)=>response.json())
  	.toPromise()
  }

  showQuestion(questionId){
  	console.log("in answer service showQuestion");
  	return this._http.get('api/shows'+questionId)
  	.map((response)=>response.json())
  	.toPromise()
  }

  getCurrentQuestion(data){
  console.log("in service's getCurrentQuestion");
  return this._http.post('/api/current_question', data)
  .map((response)=>response.json())
  .toPromise()
  }

}
