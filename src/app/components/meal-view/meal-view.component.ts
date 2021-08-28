import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.css']
})
export class MealViewComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private mealService: MealService){ }

  public theMeal: Meal;

  public mobile: boolean = false;

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
  
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      console.log(`paramsOG`, params);
      console.log(`params = ${params.get('id')}`);

      this.theMeal = this.mealService.getMeal(params.get('id'));
      console.log('meal: ', this.theMeal)
    });
  }

}
