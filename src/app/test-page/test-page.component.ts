import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  form: FormGroup;
  totalEmailsNumber: number[];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.totalEmailsNumber = this.createCustomLengthArray(10);
    this.form = this.fb.group({
      mails: this.fb.array([])
    });


    // console.log(`form`);
    // console.log(this.form);
  }

  get mails() {
    return (<FormArray>this.form.get('mails'));
    // return (<FormArray>this.form.controls['mails']);
  }

  selectNumber(emailNumbers) {
    const difference = this.mails.length - emailNumbers;
    difference > 0 ? this.removeMails(difference) : this.addMails(difference);
  }

  removeMails(difference) {
    this.createCustomLengthArray(difference)
      .forEach(item => this.mails.removeAt(this.mails.length - 1));
  }

  addMails(difference) {
    this.createCustomLengthArray(difference)
      .forEach(
        item => {
          this.mails.push(this.fb.control(null, Validators.required));
        }
      );
  }

  createCustomLengthArray(length) {
    return (new Array(Math.abs(length)))
      .fill(null)
      .map((item, index) => index + 1);
  }
}
