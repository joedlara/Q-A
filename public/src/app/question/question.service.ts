import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';


@Injectable()
export class QuestionService {

  constructor(private _http:Http) { }

  createdQuestion(newQuestion){
  	console.log("In services createdQuestion function");
  	return this._http.post('api/questions', newQuestion)
  	.map((response)=>response.json())
  	.toPromise()
  }

 
}
