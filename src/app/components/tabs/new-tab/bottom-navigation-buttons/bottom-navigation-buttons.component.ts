import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-bottom-navigation-buttons',
  templateUrl: './bottom-navigation-buttons.component.html',
  styleUrls: ['./bottom-navigation-buttons.component.css']
})
export class BottomNavigationButtonsComponent implements OnInit {

  constructor() { }
  
  @Input()
  public mobile: boolean;  
  @Input()
  public disableNext: boolean;

  @Output()
  public resetEvent: EventEmitter<boolean> = new EventEmitter();
  @Output()
  public nextStepEvent = new EventEmitter();
  
  ngOnInit(): void {
  }


  public chooseReset(fullReset: boolean): void {
    this.resetEvent.emit(fullReset)
  }

  public nextStep(): void {
    this.nextStepEvent.emit();
  }

}
