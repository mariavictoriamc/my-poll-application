import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/redux/app-state';
import * as updateDataSelectors from '../../redux/update-data-selectors';
import { answerMaded, questionMaded, removeAnswer, reset, voteAnswer } from 'src/app/modules/home/redux/update-data-actions';
import { Answer } from '../../interfaces/update-data-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) chart!: BaseChartDirective;

  form!: FormGroup;
  formRadios!: FormGroup;
  requiredField: string = 'Required field';
  question$!: Observable<string>;
  answers$!: Observable<any>;
  totalVotes: number = 0;
  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [
    { data: [0], label: 'Votes:', backgroundColor: '#ff4081' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      answersArray: this.formBuilder.array([], [Validators.minLength(2), Validators.maxLength(10)])
    });

    this.formRadios = this.formBuilder.group({
      radio: ['', Validators.required]
    });

    this.question$ = this.store.pipe(select(updateDataSelectors?.getQuestion));
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
  }

  getLengthArray(): number {
    return this.answersArray.length;
  }

  removeAnswer(index: number): void {
    this.answersArray.removeAt(index);
    this.store.dispatch(removeAnswer({index}));
    this.clearChart();
    this.updateChart();
  }

  reset(): void {
    this.answersArray.clear();
    this.form.reset();
    this.store.dispatch(reset());
    this.clearChart();
    this.updateChart();
  }

  getNumberAnswersMade(): number {
    let number: any = 0;
    this.answers$.subscribe(result => {
      number = result;
    });
    return number?.length;
  }

  vote(): void {
    const vote = this.formRadios.value;
    let startLabels: any[] = [];
    let startData: any[] = [];
    let newAnswers: any[] = [];
    this.answers$.subscribe(answers => {
      answers.forEach((answer: Answer) => {
        startLabels.push(answer?.text);
        if (answer?.id === vote?.radio) {
          const newAnswer = Object.assign({}, answer, { voteNumber: (answer?.voteNumber)+1 });
          startData.push(newAnswer?.voteNumber);
          newAnswers.push(newAnswer);
          return {
            ...newAnswer
          };
        }
        newAnswers.push(answer);
        startData.push(answer?.voteNumber);
        return answer;
      });
      this.barChartLabels = startLabels;
      this.barChartData = [{ data: startData, label: 'Votes:', backgroundColor: '#3f51b5' }];
      this.formRadios.reset();
      this.updateChart();
      return;
    });
    this.getSumContractsValue(newAnswers);
    const data = newAnswers;
    this.store.dispatch(voteAnswer({data}));
    return;
  }

  getSumContractsValue(answers: Answer[]): any {
    const values: any[] = [];
    answers?.map((answer: Answer) => {
      values.push(answer?.voteNumber);
    });
    const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
    this.totalVotes = values?.reduce(reducer, 0);
  }

  updateChart(): void {
    this.chart?.chart?.update();
  }

  clearChart(): void {
    this.totalVotes = 0;
    this.barChartLabels = [];
    this.barChartData = [
      { data: [0], label: 'Votes:', backgroundColor: '#ff4081' }
    ];
  }

}
