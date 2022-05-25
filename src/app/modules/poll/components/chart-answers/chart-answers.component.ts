import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppState } from 'src/app/shared/store/app-state';
import { Answer } from '../../interfaces/update-data-state';
import * as updateDataSelectors from '../../store/update-data-selectors';

@Component({
  selector: 'app-chart-answers',
  templateUrl: './chart-answers.component.html',
  styleUrls: ['./chart-answers.component.scss']
})
export class ChartAnswersComponent implements OnInit {

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
  totalVotes: number = 0;
  question$!: Observable<string>;
  answers$!: Observable<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.question$ = this.store.pipe(select(updateDataSelectors?.getQuestion));
    this.answers$ = this.store.pipe(select(updateDataSelectors?.getAnswers));
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

}
