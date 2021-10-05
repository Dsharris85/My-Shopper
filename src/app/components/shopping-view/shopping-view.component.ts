import { Component, HostListener, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Ingredient, ShoppingList, StoreSection, UnitLabel } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

import * as convert from 'node_modules/recipe-unit-converter';

@Component({
  selector: 'app-shopping-view',
  templateUrl: './shopping-view.component.html',
  styleUrls: ['./shopping-view.component.css']
})
export class ShoppingViewComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private mealService: MealService){ }

  public storeSections = StoreSection;
  private labels = UnitLabel;

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
      // console.log(`paramsOG`, params);
      this.mealList = this.mealService.getList(params.get('id'));

      this.mealList.mealObjects = [];

      this.getMealsFromList(this.mealList);
      this.sortMealsIntoShoppingList();

    });
  }
  
  public sortMealsIntoShoppingListTest() {
    this.mealList.mealObjects.forEach(meal => {
      // console.log('meal', meal);
      // console.log(`meal=`, meal);
      if(meal){
        meal.ingredients.forEach(ingredient => {
          var found = this.shoppingList.filter(i => i.name == ingredient.name);
          // if already need to buy item, just add amount to same obj
          found.forEach(foundIngredient => {
            if(foundIngredient){
              if(foundIngredient.unitLabel == ingredient.unitLabel){
                this.shoppingList.find(i => i.name == ingredient.name).unitAmount += ingredient.unitAmount;
              }else {
                // var convertError = false;
                try{
                  var toAdd = this.addDifferentUnitLabels(foundIngredient, ingredient);
                  this.shoppingList.find(i => i.name == ingredient.name).unitAmount += toAdd;
                } catch(error) {
                  // convertError = true;
                  // console.log('error', ingredient, found);
                  this.shoppingList.push(ingredient);
                }
                
              //   if(convertError){
              //   console.log('errored!!!')
              // }
  
              }
            } else {
              this.shoppingList.push(ingredient);
            }
          });
          
        });
      }
    });
  }

  public sortMealsIntoShoppingList() {
    this.mealList.mealObjects.forEach(meal => {
      // console.log('meal', meal);
      // console.log(`meal=`, meal);
      if(meal){
        meal.ingredients.forEach(ingredient => {
          var found = this.shoppingList.find(i => i.name == ingredient.name);
          // console.log(`ingredient/lists in sorting:`, ingredient, this.shoppingList, this.mealList);
          // console.log(`found in sorting:`, found);
          // if already need to buy item, just add amount to same obj
          if(found){
            if(found.unitLabel == ingredient.unitLabel){
              this.shoppingList.find(i => i.name == ingredient.name).unitAmount += ingredient.unitAmount;
            }else {
              // var convertError = false;
              try{
                var toAdd = this.addDifferentUnitLabels(found, ingredient);
                this.shoppingList.find(i => i.name == ingredient.name).unitAmount += toAdd;
              } catch(error) {
                // convertError = true;
                // console.log('error', ingredient, found);
                this.shoppingList.push(ingredient);
              }
              
            //   if(convertError){
            //   console.log('errored!!!')
            // }

            }
          } else {
            this.shoppingList.push(ingredient);
          }
        });
      }
    });
  }

  addDifferentUnitLabels(found: Ingredient, ingredient: Ingredient): number {
    var diff = 0;
    diff = convert(ingredient.unitAmount).from(ingredient.unitLabel.toString()).to(found.unitLabel.toString());
    // console.log(`diff =`, diff);
    return diff;
  }

  public getMealsFromList(list: ShoppingList) {
    // console.log('shoppinglist', list);
    this.mealList.meals.forEach(mealID => {
      // console.log(mealID);
      var found = this.mealService.getMeal(mealID);
      // console.log('found', found);
      this.mealList.mealObjects.push(found);
      // console.log(this.mealList);

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

  public getSections(section: StoreSection): Ingredient[] {
    
    // console.log("section:", section)
    // console.log(`list here`, this.shoppingList);
    // premake on init, and just grab so don't need filter everytime
    var rtn = this.shoppingList.filter(ingredient => ingredient.sectionOfStore == section);
    // console.log(rtn)
    return rtn;
  }

}
