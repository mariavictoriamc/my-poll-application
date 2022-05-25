import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgChartsModule } from 'ng2-charts';
import { PollComponent } from './pages/poll/poll.component';
import { PollRoutingModule } from './poll-routing.module';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { TypeQuestionAnswersComponent } from './components/type-question-answers/type-question-answers.component';
import { VoteAnswerComponent } from './components/vote-answer/vote-answer.component';
import { ChartAnswersComponent } from './components/chart-answers/chart-answers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    NgChartsModule,
    PollRoutingModule,
    HeaderModule
  ],
  declarations: [
    PollComponent,
    TypeQuestionAnswersComponent,
    VoteAnswerComponent,
    ChartAnswersComponent
  ]
})
export class PollModule {}
