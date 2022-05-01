import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from './services/quiz.service';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'devesh/:quizName', component: QuizComponent },
  { path: 'devesh', component: QuizListComponent },
  { path: '', redirectTo: '/devesh', pathMatch: 'full' },
  { path: '**', redirectTo: '/devesh', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, QuizListComponent, QuizComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
