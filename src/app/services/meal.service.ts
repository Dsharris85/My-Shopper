import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Ingredient, Meal, ShoppingList } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor() { }

  public saveNewMeal(meal: Meal, id?: string): void {
    var id = (id ? id : this.generateID());

    meal.id = id;
    var toSave = JSON.stringify(meal);
    localStorage.setItem(`MEAL_${id}`, toSave);    
  }

  public saveNewList(list: ShoppingList): void {
    var id = this.generateID();
    list.id = id;
    var toSave = JSON.stringify(list);
    localStorage.setItem(`LIST_${id}`, toSave);
  }

  public getMeal(id: string): Meal {
    var found = localStorage.getItem(`MEAL_${id}`);
    return JSON.parse(found);    
  }

  public getList(id: string): ShoppingList {
    var found = localStorage.getItem(`LIST_${id}`);
    return JSON.parse(found);    
  }

  public getAllMeals(): Meal[] {
    var meals: Meal[] = [];

    Object.keys(localStorage).forEach(key => {
      if(key.includes('MEAL')){
        // console.log(`\n\nKV:`);
        // console.log(localStorage.getItem(key));
        // console.log(key);
        meals.push(JSON.parse(localStorage.getItem(key)))
      }
    });

    meals.sort((a: Meal, b: Meal) => (a.name < b.name ? -1 : 1));
    // console.log(`meals`, meals);
    return meals;
  }

  public getAllLists(): ShoppingList[] {
    var lists: ShoppingList[] = [];

    Object.keys(localStorage).forEach(key => {
      if(key.includes('LIST')){
        
        lists.push(JSON.parse(localStorage.getItem(key)))
      }
    });
    
    return lists;
  }

  public deleteMeal(id: string): void {
    localStorage.removeItem(`MEAL_${id}`);
  }
  
  public deleteList(id: string): void {
    localStorage.removeItem(`LIST_${id}`);
  }


  makeRandomMeals(numberToMake: number): void {
    console.log(`num to make = ${numberToMake}`);
    for(var i = 0; i < numberToMake; i++){
      console.log(`i = ${i}`);
      var ingredients: Ingredient[] = [];

      for(var j = 0; j < 3; j++){
        ingredients.push({
          name: this.randomFromArray(this.mealNames),
          unitAmount: this.randomFromArray(this.nums),
          unitLabel: this.randomFromArray(this.units),
          //numberOf: this.randomFromArray(this.nums)
        })
      } 

      var meal: Meal = {
        name: this.randomFromArray(this.mealNames),
        id: null,
        //id: this.generateID,
        description: "DESCRIPTION OF MEAL",
        ingredients: ingredients
      }

      this.saveNewMeal(meal);
      console.log(`new meal`, meal);
    }
  }

  randomFromArray = arr => arr[Math.floor(Math.random() * arr.length)];
  mealNames: string[] = ['pasta dinner','steak dinner','potato soup','sandwiches','fried rice']
  units: string[] = ['mg','lb','c','g']
  nums: number[] = [1,2,3,4];
  
  public generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
}
