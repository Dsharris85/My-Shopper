import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mobile: boolean = false;

  constructor() {
    this.onResize();
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(event) {
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
