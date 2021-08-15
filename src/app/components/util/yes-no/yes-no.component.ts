import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css']
})
export class YesNoComponent implements OnInit {

  public id: string;

  @Output()
  public deleteThis = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public idObj: any) {}

  ngOnInit(): void {
    this.id = this.idObj.id;
    console.log(`id is ${this.id}`);
  }

  public deleteItem(): void {
    this.deleteThis.emit(this.id);
  }
}
