import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';


@Injectable()
export class ShowService {

  constructor(private _http: Http) { }

  showCurrentQuestion(findCurrentQuestion){
  	console.log("In show services showCurrentQuestion");
  	return this._http.post('/api/findCurrentQuestion', findCurrentQuestion)
  	.map((response)=> response.json())
  	.toPromise()
  }

  likeAnswer(answerId){
  	console.log("in wall service's likeAnswer");
    return this._http.post('/api/like/', answerId)
    .map((response)=>response.json())
    .toPromise()
  }




}