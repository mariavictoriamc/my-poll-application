import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  lengthAnswers!: number;
  totalAnswers!: number;
  question!: string;
  options!: number[];
  totalVotes!: number;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      question: ['What is the value of π?'],
      answer: ['3.14'],
      add: ['']
    });

    this.lengthAnswers = 1;
    this.totalAnswers = 10;
    this.question = this.form.get('question')?.value;
    this.options = [3.14, 3.1416, 3.14159264];
    this.totalVotes = 10;
  }

  remove(): void {}

  add(): void {}

  reset(): void {}

}
