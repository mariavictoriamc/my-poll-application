import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ChartType, ChartConfiguration,  } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/redux/app-state';
import { answerMaded, questionMaded, removeAnswer, reset, voteAnswer } from 'src/app/modules/home/redux/update-data-actions';
import { Answer } from '../../interfaces/update-data-state';
import * as updateDataSelectors from '../../redux/update-data-selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) chart!: BaseChartDirective;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  barChartLegend: boolean = false;
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Votes:',
        backgroundColor: '#3f51b5'
      }
    ],
    labels: []
  }
  form!: FormGroup;
  formRadios!: FormGroup;
  requiredField: string = 'Required field';
  question$!: Observable<string>;
  answers$!: Observable<any>;
  totalVotes: number = 0;

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

  vote(): void {
    const vote = this.formRadios.value;
    for (let i = 0; i < this.barChartData.datasets.length; i++) {
      for (let j = 0; j < this.barChartData.datasets[i].data.length; j++) {
        if (vote?.radio === j) {
          this.answers$.subscribe(answers => {
            answers.map((answer: Answer, index: number) => {
              // const data = Object.assign({}, answer, { id: answer?.id, text: answer?.text, voteNumber: this.sumNumber(answer?.voteNumber) });
              this.barChartData.datasets[i].data[j] = this.sumNumber(answer?.voteNumber);
              // this.store.dispatch(voteAnswer({data}));
              return;
            });
          });
        }
      }
    }
    this.getSumVotesValue();
    this.formRadios.reset();
    this.updateChart();
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
    this.barChartData.datasets.forEach((item) => {
      item.data.push(data.voteNumber);
    });
    this.barChartData?.labels?.push(answer?.value);
    this.updateChart();
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

  getSumVotesValue(): any {
    this.answers$.subscribe(answers => {
      this.totalVotes = answers.map((answer: Answer) => answer?.voteNumber).reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
    });
  }

  updateChart(): void {
    this.chart?.update();
  }

  clearChart(): void {
    this.totalVotes = 0;
    this.barChartData.datasets =  [
      {
        data: [],
        label: 'Votes:',
        backgroundColor: '#3f51b5'
      }
    ];
    this.barChartData.labels = [];
  }

  private sumNumber(voteNumber: number): number {
    return Math.floor(voteNumber + 1);
  }

}
