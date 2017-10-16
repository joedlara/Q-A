import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { WallComponent } from './wall/wall.component';
import { ShowComponent } from './show/show.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent},
	{ path: '', component: WallComponent},
	{ path: 'new_question', component: QuestionComponent},

	
	{ path: 'question/:questionId', component: ShowComponent},
	{ path: 'question/:questionId/new_answer', component: AnswerComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }