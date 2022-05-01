import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuizConfig } from 'src/app/models/quiz-config';
import { QuizService } from 'src/app/services/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  quizScore: number;
  quizTotalScore: number;


  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false, 
    pageNumber: 1,
    showpagenumber: true,
  };

  pagenumber = {
    no: 0,
    size: 1,
    count: 1,
  };


  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private location:Location
  ) {}

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizScore = 0;
    // this.quizName = this.quizes[0].id;
    // this.loadQuiz(this.quizName);
    this.route.paramMap.subscribe(() => {
      this.handleQuiz();
    });
  }

  handleQuiz() {
    const quizName: string = this.route.snapshot.paramMap.get('quizName');
    const quiz: any = this.quizes.find((o) => o.name === quizName);
    const quizUrl: string = quiz.id;

    this.loadQuiz(quizUrl);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe((res) => {
      //console.log(`Quiz Name: ${quizName} Response: ${JSON.stringify(res)} ` )
      this.quiz = new Quiz(res);
      this.pagenumber.count = this.quiz.questions.length;
      this.quizTotalScore = this.quiz.questions.length;

    });
    this.mode = 'quiz';
  }


  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }
  get filteredQuestions() {
    return this.quiz.questions
      ? this.quiz.questions.slice(
          this.pagenumber.no,
          this.pagenumber.no + this.pagenumber.size
        )
      : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) x.selected = false;
      });

      if (this.isCorrect(question) == 'correct') {
        this.quizScore = this.quizScore + 1;
      }
    }

    if (this.config.autoMove) {
      this.goTo(this.pagenumber.no + 1);
    }
  }

  goTo(no: number) {
    if (no >= 0 && no < this.pagenumber.count) {
      this.pagenumber.no = no;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find((x) => x.selected)
      ? 'Answered'
      : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every((x) => x.selected === x.isAnswer)
      ? 'correct'
      : 'wrong';
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach((x) =>
      answers.push({
        quizId: this.quiz.id,
        questionId: x.id,
        answered: x.answered,
      })
    );

    this.mode = 'result';
  }
}
