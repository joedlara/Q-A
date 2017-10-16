import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AnswerService } from './answer/answer.service';
import { LoginService } from './login/login.service';
import { QuestionService } from './question/question.service';
import { ShowService } from './show/show.service';
import { WallService } from './wall/wall.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WallComponent } from './wall/wall.component';
import { ShowComponent } from './show/show.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WallComponent,
    ShowComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
  ],
  providers: [AnswerService, LoginService, QuestionService, ShowService, WallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
