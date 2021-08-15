import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatListOption } from '@angular/material/list';
import { Sort } from '@angular/material/sort';
import { Meal, ShoppingList, UnitLabel } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class NewTabComponent implements OnInit {

  public unitLabels = UnitLabel; 
  public enumKeys=[];

  public meal: boolean = false;
  public list: boolean = false;
 
  public totalIngredientsNumber: number[];

  public mealName: string = "";
  public mealDescription: string = "";
  public listName: string = "";
  public listDescription: string = "";

  public selectedMeals: string[] = [];

  public nameFormGroup: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required,  Validators.maxLength(40)]],
    description: ['', Validators.maxLength(100)]
  });

  public listNameFormGroup: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required,  Validators.maxLength(40)]],
    description: ['', Validators.maxLength(100)]
  });

  public ingredientsFormGroup: FormGroup = this._formBuilder.group({
    iAmount: this._formBuilder.array([['', [Validators.maxLength(3), Validators.required]]]),
    iUnit: this._formBuilder.array(['']),
    // iUnit: this._formBuilder.array([['']]),
    iName: this._formBuilder.array([['', [Validators.maxLength(40), Validators.required]]]),
  });

  public newMeal: Meal = {
    ingredients: [],
    name: null,
    id: null
  };

  public newList: ShoppingList = {
    name: null,
    id: null,
    meals: []
  };

  public allMeals: Meal[] = [];


  constructor(private _formBuilder: FormBuilder, private mealService: MealService) {
    this.enumKeys = Object.keys(this.unitLabels);
  

  }

  ngOnInit() {       
    //this.generateRandomMeals(10);
    this.getAllMeals();
    // console.log(`all:`, this.allMeals);
    // this.deleteMeal('813571f4-3e2f-4aaa-a505-8f17505b48af');
  }

  

  public onChooseMeal(): void {
    this.meal = true;
    this.list = false;
  }

  public onChooseList(): void {
    this.list = true;
    this.meal = false;
  }

  public resetChoice(switchChoice: boolean = false): void {
    if(switchChoice){
      this.list = !this.list;
      this.meal = !this.meal;
    } else {
      this.list = false;
      this.meal = false;
    }
  }

  get iUnit() {
    return (<FormArray>this.ingredientsFormGroup.get('iUnit'));
  }
  
  get iAmount() {
    return (<FormArray>this.ingredientsFormGroup.get('iAmount'));
  }
  
  get iName() {
    return (<FormArray>this.ingredientsFormGroup.get('iName'));
  }

  selectNumber(emailNumbers) {
    const difference = this.iUnit.length - emailNumbers;
    difference > 0 ? this.removeIngredients(difference) : this.addIngredients(difference);
  }

  removeIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(item => {
        this.iUnit.removeAt(this.iUnit.length - 1);
        this.iName.removeAt(this.iUnit.length - 1);
        this.iAmount.removeAt(this.iUnit.length - 1);
      });
  }

  addIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(
        item => {
          this.iUnit.push(this._formBuilder.control(null));
          this.iName.push(this._formBuilder.control(null, Validators.required));
          this.iAmount.push(this._formBuilder.control(null, Validators.required));
        }
      );
  }

  createCustomLengthArray(length) {
    return (new Array(Math.abs(length)))
      .fill(null)
      .map((item, index) => index + 1);
  }

  public addIngredient(): void {
    this.selectNumber(this.iUnit.length+1);
  }

  public removeIngredient(): void {
    if(this.iUnit.length > 0) {
      this.selectNumber(this.iUnit.length-1);
    }
  }

  public addMeal(stepper: any): void {
    
    this.newMeal.name = this.mealName;
    if(this.mealDescription != ""){
      this.newMeal.description = this.mealDescription;
    }

    for (var i = 0; i < this.ingredientsFormGroup.value['iAmount'].length; i++){
      this.newMeal.ingredients.push({
        name: this.ingredientsFormGroup.value['iName'][i],
        unitAmount: this.ingredientsFormGroup.value['iAmount'][i],
        unitLabel: this.ingredientsFormGroup.value['iUnit'][i]
      })
    }

    this.mealService.saveNewMeal(this.newMeal);

    this.newMeal = {
      ingredients: [],
      name: null,
      id: null
    };

    this.mealName = "";
    this.mealDescription = "";
    stepper.reset();
  }

  public addList(stepper: any): void {

    this.newList.name = this.listName;
    if(this.listDescription != ""){
      this.newList.description = this.listDescription;
    }

    this.newList.meals = this.selectedMeals;

    this.mealService.saveNewList(this.newList);

    this.newList = {
      name: null,
      id: null,
      meals: []
    };

    this.listDescription = "";
    this.listName = "";
    stepper.reset();

  }

  public getAllMeals(): void {
    this.allMeals = this.mealService.getAllMeals();
  }

  public deleteMeal(id: string): void {
    this.mealService.deleteMeal(id);
  }

  public generateRandomMeals(num: number): void {
    this.mealService.makeRandomMeals(num);
  }

  public mealSelectionChanged(options: MatListOption[]): void {
    // console.log(`changed`);
    // // console.log($event);
    // console.log(options);

    options.forEach(option => {
      console.log(option.value);
    });

    this.selectedMeals = options.map(x => x.value)

    // console.log(`selectedMeals`);
    // console.log(this.selectedMeals);
  }




  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

}