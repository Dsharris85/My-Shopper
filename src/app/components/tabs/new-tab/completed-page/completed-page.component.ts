import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-completed-page',
  templateUrl: './completed-page.component.html',
  styleUrls: ['./completed-page.component.css']
})
export class CompletedPageComponent implements OnInit {

  @Input()
  public mobile: boolean;
  
  @Output()
  public selectionEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public selectNavigate(where: string): void {
    this.selectionEvent.emit(where);
  }

}
