import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mobile: boolean = false;
  width: number = 0;

  constructor() {
    this.onResize();
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(event) {
      this.width = event.target.innerWidth;
      if(event.target.innerWidth < 700){
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    } else {
      if(window.innerWidth < 700){
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    }
  }

  ngOnInit(): void { } 

}

