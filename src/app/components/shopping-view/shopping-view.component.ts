import { Component, HostListener, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Ingredient, ShoppingList } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private mealService: MealService){ }

  public mealList: ShoppingList;
  public shoppingList: Ingredient[] = [];

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
      this.mealList = this.mealService.getList(params.get('id'));

      console.log(`params =${params.get('id')}`);

      this.mealList.mealObjects = [];

      this.getMealsFromList(this.mealList);
      this.sortMealsIntoShoppingList();

      // console.log(`MEAL & SHOPPING`);
      // console.log(this.mealList);
      // console.log(this.shoppingList);
    });
  }
  
  public sortMealsIntoShoppingList() {
    this.mealList.mealObjects.forEach(meal => {
      // console.log(`meal=`, meal);
      if(meal){
        meal.ingredients.forEach(ingredient => {
          var found = this.shoppingList.find(i => i.name == ingredient.name);
          // if already need to buy item, just add amount to same obj
          if(found){
            this.shoppingList.find(i => i.name == ingredient.name).unitAmount += ingredient.unitAmount;
          } else {
            this.shoppingList.push(ingredient);
          }
        });
      }
    });
  }

  public getMealsFromList(list: ShoppingList) {
    this.mealList.meals.forEach(mealID => {
      this.mealList.mealObjects.push(this.mealService.getMeal(mealID));
    });
    // console.log(this.mealList);
  }

  public swapCheck(options: MatListOption[]): void {
    // console.log(`changed`);
    // console.log($event);
    console.log(options);

    options.forEach(option => {
      console.log(option.value);
    });

    // this.selectedMeals = options.map(x => x.value)

    // console.log(`selectedMeals`);
    // console.log(this.selectedMeals);
  } 

}
