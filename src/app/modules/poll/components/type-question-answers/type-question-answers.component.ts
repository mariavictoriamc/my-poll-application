import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { answerMaded, questionMaded, removeAnswer, reset } from '../../store/update-data-actions';
import * as updateDataSelectors from '../../store/update-data-selectors';

@Component({
  selector: 'app-type-question-answers',
  templateUrl: './type-question-answers.component.html',
  styleUrls: ['./type-question-answers.component.scss']
})
export class TypeQuestionAnswersComponent implements OnInit {

  form!: FormGroup;
  requiredField: string = 'Required field';
  answers$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      answersArray: this.formBuilder.array([], [Validators.minLength(2), Validators.maxLength(10)])
    });

    this.answers$ = this.store.pipe(select(updateDataSelectors?.getAnswers));
  }

  get question() { return this.form.get('question'); }

  get answersArray(): FormArray {
    return this.form.get('answersArray') as FormArray;
  }

  questionMaded(): void {
    const data = this.form.get('question')?.value;
    this.store.dispatch(questionMaded({data}));
    this.answersArray.push(this.newAnswer());
  }

  newAnswer(): FormControl {
    return this.formBuilder.control('');
  }

  addAnswer(answer: AbstractControl, i: number): void {
    this.answersArray.push(this.newAnswer());
    const data = {
      id: i,
      text: answer?.value,
      voteNumber: 0
    };
    this.store.dispatch(answerMaded({data}));
    // this.barChartData.datasets.forEach((item) => {
    //   item.data.push(data.voteNumber);
    // });
    // this.barChartData?.labels?.push(answer?.value);
    // this.updateChart();
  }

  removeAnswer(index: number): void {
    this.answersArray.removeAt(index);
    this.store.dispatch(removeAnswer({index}));
    // this.clearChart();
    // this.updateChart();
  }

  reset(): void {
    this.answersArray.clear();
    this.form.reset();
    this.store.dispatch(reset());
    // this.clearChart();
    // this.updateChart();
  }

  getNumberAnswersMade(): number {
    let number: any = 0;
    this.answers$.subscribe(result => {
      number = result;
    });
    return number?.length;
  }

}
