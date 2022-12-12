import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { PollService } from '../../services/poll.service';
import { voteAnswer } from '../../store/update-data/update-data-actions';
import * as updateDataSelectors from '../../store/update-data/update-data-selectors';

@Component({
  selector: 'app-vote-answer',
  templateUrl: './vote-answer.component.html',
  styleUrls: ['./vote-answer.component.scss']
})
export class VoteAnswerComponent implements OnInit {

  question$!: Observable<string>;
  answers$!: Observable<any>;
  formRadios!: FormGroup;
  lengthArray!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.formRadios = this.formBuilder.group({
      radio: ['', Validators.required]
    });

    this.question$ = this.store.pipe(select(updateDataSelectors?.getQuestion));
    this.answers$ = this.store.pipe(select(updateDataSelectors?.getAnswers));
    this.getLengthArray();
  }

  getLengthArray(): void {
    this.pollService.answersArray.subscribe(lengthArray => this.lengthArray = lengthArray);
  }

  disabledButton(): boolean {
    if (!this.formRadios.valid || this.lengthArray <= 2) {
      return true;
    }
    return false;
  }

  vote(): void {
    const vote = this.formRadios?.value?.radio;
    const data = {
      id: vote?.id,
      text: vote?.text,
      voteNumber: this.sumNumber(vote?.voteNumber)
    }
    this.store.dispatch(voteAnswer({data: data}));
    this.formRadios.reset();
    this.pollService.updateChartSource.next(true);
  }

  private sumNumber(voteNumber: number): number {
    return Math.floor(voteNumber + 10);
  }

}
