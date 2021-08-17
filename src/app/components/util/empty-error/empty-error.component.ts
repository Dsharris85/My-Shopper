import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-error',
  templateUrl: './empty-error.component.html',
  styleUrls: ['./empty-error.component.css']
})
export class EmptyErrorComponent implements OnInit {

  @Input()
  public emptyItem: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
