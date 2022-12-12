import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppState } from 'src/app/shared/store/app-state';
import { Answer } from '../../interfaces/update-data-state';
import { PollService } from '../../services/poll.service';
import * as updateDataSelectors from '../../store/update-data/update-data-selectors';
import * as chartAnswersSelectors from '../../store/chart-answers/chart-answers-selectors';

@Component({
  selector: 'app-chart-answers',
  templateUrl: './chart-answers.component.html',
  styleUrls: ['./chart-answers.component.scss']
})
export class ChartAnswersComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) chart!: BaseChartDirective;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  barChartLegend: boolean = false;
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'Votes',
        backgroundColor: '#3f51b5'
      }
    ],
    labels: []
  }
  totalVotes: number = 0;
  question$!: Observable<string>;
  answers$!: Observable<any>;
  chartAnswers$!: Observable<any>;
  labels$!: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.question$ = this.store.pipe(select(updateDataSelectors?.getQuestion));
    this.answers$ = this.store.pipe(select(updateDataSelectors?.getAnswers));
    this.chartAnswers$ = this.store.pipe(select(updateDataSelectors?.getChartAnswers));
    this.labels$ = this.store.pipe(select(chartAnswersSelectors?.getLabels));
    
    this.updateChart();

    this.answers$.subscribe(answers => {
      if (answers?.length) {
        this.chartAnswers$.subscribe(chartAnswers => {
          if (chartAnswers?.length) {
            chartAnswers.map((answer: Answer) => {
              const indexNum = answers.findIndex((el: any) => el?.text === answer?.text);
              this.barChartData.datasets[0].data[indexNum] = answer?.voteNumber;
              this.updateChart();
              this.getSumVotesValue();
              return;
            });
          }
        });
      }
    });

    this.labels$.subscribe(labels => {
      if (labels) {
        this.barChartData?.labels?.push(labels);
        this.updateChart();
      }
    });
  }

  updateChart(): void {
    this.pollService.updateChart.subscribe(update => {
      if (update) {
        this.chart?.update();
      }
    });
  }

  clearChart(): void {
    this.totalVotes = 0;
    this.barChartData.datasets =  [
      {
        data: [],
        label: 'Votes',
        backgroundColor: '#3f51b5'
      }
    ];
    this.barChartData.labels = [];
  }

  private getSumVotesValue(): void {
    const values: number[] = [];
    this.chartAnswers$.subscribe(chartAnswers => {
      chartAnswers.map((answer: Answer) => {
        values.push(answer?.voteNumber);
      });
      const reducer = ((accumulator: number, currentValue: number) => accumulator + currentValue);
      this.totalVotes = values.reduce(reducer);
    });
  }

}
