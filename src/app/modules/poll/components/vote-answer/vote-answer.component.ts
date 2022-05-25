import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vote-answer',
  templateUrl: './vote-answer.component.html',
  styleUrls: ['./vote-answer.component.scss']
})
export class VoteAnswerComponent implements OnInit {

  question$!: Observable<string>;
  answers$!: Observable<any>;
  formRadios!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formRadios = this.formBuilder.group({
      radio: ['', Validators.required]
    });
  }

  getLengthArray(): number {
    return 0;
    // return this.answersArray.length;
  }

  vote(): void {
    const vote = this.formRadios.value;
    // for (let i = 0; i < this.barChartData.datasets.length; i++) {
    //   for (let j = 0; j < this.barChartData.datasets[i].data.length; j++) {
    //     if (vote?.radio === j) {
    //       this.answers$.subscribe(answers => {
    //         answers.map((answer: Answer, index: number) => {
    //           // const data = Object.assign({}, answer, { id: answer?.id, text: answer?.text, voteNumber: this.sumNumber(answer?.voteNumber) });
    //           this.barChartData.datasets[i].data[j] = this.sumNumber(answer?.voteNumber);
    //           // this.store.dispatch(voteAnswer({data}));
    //           return;
    //         });
    //       });
    //     }
    //   }
    // }
    // this.getSumVotesValue();
    this.formRadios.reset();
    // this.updateChart();
  }

  private sumNumber(voteNumber: number): number {
    return Math.floor(voteNumber + 1);
  }

}
