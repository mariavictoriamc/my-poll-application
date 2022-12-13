import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { PollService } from '../../services/poll.service';
import { answerMaded, questionMaded, removeAnswer, reset } from '../../store/update-data/update-data-actions';
import { addLabelChart, clearChart } from '../../store/chart-answers/chart-answers-actions';
import * as updateDataSelectors from '../../store/update-data/update-data-selectors';

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
    private store: Store<AppState>,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      answersArray: this.formBuilder.array([], [Validators.minLength(2), Validators.maxLength(10)])
    });

    this.answers$ = this.store.pipe(select(updateDataSelectors?.getAnswers));
  }

  get question() { 
    return this.form.get('question');
  }

  get answersArray(): FormArray {
    return this.form.get('answersArray') as FormArray;
  }

  questionMaded(): void {
    const data = this.form.get('question')?.value;
    this.store.dispatch(questionMaded({data}));
    this.answersArray.push(this.newAnswer());
    this.pollService.answersArraySource.next(this.answersArray?.length);
  }

  newAnswer(): FormControl {
    return this.formBuilder.control('');
  }

  addAnswer(answer: AbstractControl, i: number): void {
    this.answersArray.push(this.newAnswer());
    this.pollService.answersArraySource.next(this.answersArray?.length);
    const data = {
      id: i,
      text: answer?.value,
      voteNumber: 10
    };
    this.store.dispatch(answerMaded({data}));
    this.store.dispatch(addLabelChart({data: answer?.value}));
    this.pollService.updateChartSource.next(true);
  }

  removeAnswer(index: number): void {
    this.answersArray.removeAt(index);
    this.pollService.answersArraySource.next(this.answersArray?.length);
    this.store.dispatch(removeAnswer({index}));
    this.pollService.updateChartSource.next(true);
    this.store.dispatch(clearChart());
  }

  reset(): void {
    this.answersArray.clear();
    this.pollService.answersArraySource.next(this.answersArray?.length);
    this.form.reset();
    this.store.dispatch(reset());
    this.pollService.updateChartSource.next(true);
    this.store.dispatch(clearChart());
  }

  getNumberAnswersMade(): number {
    let number: any = 0;
    this.answers$.subscribe(result => {
      number = result;
    });
    return number?.length;
  }

}
