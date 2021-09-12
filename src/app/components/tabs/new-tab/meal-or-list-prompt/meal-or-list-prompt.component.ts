import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meal-or-list-prompt',
  templateUrl: './meal-or-list-prompt.component.html',
  styleUrls: ['./meal-or-list-prompt.component.css']
})
export class MealOrListPromptComponent implements OnInit {

  constructor() { }

  @Input()
  public chooseMeal: boolean = false;
  @Input()
  public chooseList: boolean = false;

  @Output()
  public mealEvent = new EventEmitter();
  
  @Output()
  public listEvent = new EventEmitter();

  ngOnInit(): void {
  }

  public onChooseMeal(): void {
    this.mealEvent.emit('');
  }

  public onChooseList(): void {
    this.listEvent.emit('');
  }
}
