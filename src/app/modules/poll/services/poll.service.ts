import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  answersArraySource = new BehaviorSubject(0);
  answersArray = this.answersArraySource.asObservable();
  
  updateChartSource = new BehaviorSubject(false);
  updateChart = this.updateChartSource.asObservable();

  constructor() {}

}
