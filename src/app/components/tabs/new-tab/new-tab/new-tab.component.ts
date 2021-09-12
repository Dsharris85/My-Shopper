import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatListOption } from '@angular/material/list';
import { Sort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { Ingredient, Meal, ShoppingList, StoreSection, UnitLabel } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';
import { NewMealPopupComponent } from '../../new-meal-popup/new-meal-popup.component';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class NewTabComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;

  @Input()
  public mobileMode: boolean = false;

  public unitLabels = UnitLabel; 
  public enumKeys=[];

  public sectionLabels = StoreSection; 
  public enumSections=[];

  public meal: boolean = false;
  public list: boolean = false;
 
  // public totalIngredientsNumber: number[];

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

  public recipeFormGroup: FormGroup = this._formBuilder.group({
    steps: this._formBuilder.array([['', [Validators.maxLength(500), Validators.required]]]),
  });

  public ingredientsFormGroup: FormGroup = this._formBuilder.group({
    iAmount: this._formBuilder.array([['', [Validators.maxLength(3), Validators.required]]]),
    iUnit: this._formBuilder.array(['']),
    iName: this._formBuilder.array([['', [Validators.maxLength(40), Validators.required]]]),
    iSection: this._formBuilder.array([['', [Validators.maxLength(40)]]]),
  });

  public newMeal: Meal = {
    ingredients: [],
    recipe: [],
    name: null,
    id: null
  };

  public newList: ShoppingList = {
    name: null,
    id: null,
    meals: []
  };

  public allMeals: Meal[] = [];


  constructor(private _formBuilder: FormBuilder, private mealService: MealService, public dialog: MatDialog) {
    this.enumKeys = Object.keys(this.unitLabels);
    this.enumSections = Object.keys(this.sectionLabels);
  }

  ngOnInit() {       
    //this.generateRandomMeals(10);
    this.getAllMeals();
    // this.deleteMeal('813571f4-3e2f-4aaa-a505-8f17505b48af');
  } 

  public onChooseMeal(): void {
    this.resetFormsAndValues();
    this.meal = true;
    this.list = false;
  }

  public onChooseList(): void {
    this.resetFormsAndValues();
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

  get iSection() {
    return (<FormArray>this.ingredientsFormGroup.get('iSection'));
  }

  get steps() {
    return (<FormArray>this.recipeFormGroup.get('steps'));
  }

  selectNumber(numbers) {
    const difference = this.iUnit.length - numbers;
    difference > 0 ? this.removeIngredients(difference) : this.addIngredients(difference);
  }

  selectNumberStepsRecipe(numbers){
    const difference = this.steps.length - numbers;
    difference > 0 ? this.removeSteps(difference) : this.addSteps
    (difference);
  }
  
  removeSteps(difference) {
    this.createCustomLengthArray(difference)
      .forEach(item => {
        this.steps.removeAt(this.steps.length - 1);       
      });
  }

  removeIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(item => {
        this.iUnit.removeAt(this.iUnit.length - 1);
        this.iName.removeAt(this.iUnit.length - 1);
        this.iSection.removeAt(this.iUnit.length - 1);
        this.iAmount.removeAt(this.iUnit.length - 1);
      });
  }

  addSteps(difference){
    this.createCustomLengthArray(difference)
    .forEach(
      item => {
        this.steps.push(this._formBuilder.control(null));        
      }
    );
  }

  addIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(
        item => {
          this.iUnit.push(this._formBuilder.control(null));
          this.iSection.push(this._formBuilder.control(null));
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

  public addStep(): void {
    this.selectNumberStepsRecipe(this.steps.length+1)
  }

  public removeIngredient(): void {
    if(this.iUnit.length > 0) {
      this.selectNumber(this.iUnit.length-1);
    }
  }

  public removeStep(): void {
    if(this.steps.length > 0) {
      this.selectNumberStepsRecipe(this.steps.length-1);
    }
  }

  public addMeal(stepper: any): void {
    
    this.newMeal.name = this.mealName;
    if(this.mealDescription != ""){
      this.newMeal.description = this.mealDescription;
    }

    if(!this.mobileMode){
        for (var i = 0; i < this.ingredientsFormGroup.value['iAmount'].length; i++){
        this.newMeal.ingredients.push({
          name: this.ingredientsFormGroup.value['iName'][i],
          sectionOfStore: this.ingredientsFormGroup.value['iSection'][i],
          unitAmount: this.ingredientsFormGroup.value['iAmount'][i],
          unitLabel: this.ingredientsFormGroup.value['iUnit'][i]
        })
      }
    } else {
      //already added ingredients
    }

    for (var i = 0; i< this.recipeFormGroup.value['steps'].length; i++){
      this.newMeal.recipe.push(this.recipeFormGroup.value['steps'][i]);
    }

    console.log("new meal")
    console.log(this.newMeal);
    
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

  public stepperGoTo(step: number): void {
    this.myStepper.selectedIndex = step - 1;
  }

  public resetFormsAndValues(): void {
    this.mealName = "";
    this.mealDescription = "";
    this.listName = "";
    this.listDescription = "";
  
    this.selectedMeals = [];
  
    this.nameFormGroup = this._formBuilder.group({
      name: ['', [Validators.required,  Validators.maxLength(40)]],
      description: ['', Validators.maxLength(100)]
    });
  
    this.listNameFormGroup = this._formBuilder.group({
      name: ['', [Validators.required,  Validators.maxLength(40)]],
      description: ['', Validators.maxLength(100)]
    });
  
    this.recipeFormGroup = this._formBuilder.group({
      steps: this._formBuilder.array([['', [Validators.maxLength(500), Validators.required]]]),
    });
  
    this.ingredientsFormGroup = this._formBuilder.group({
      iAmount: this._formBuilder.array([['', [Validators.maxLength(3), Validators.required]]]),
      iUnit: this._formBuilder.array(['']),
      iName: this._formBuilder.array([['', [Validators.maxLength(40), Validators.required]]]),
      iSection: this._formBuilder.array([['', [Validators.maxLength(40)]]]),
    });
  
    this.newMeal = {
      ingredients: [],
      recipe: [],
      name: null,
      id: null
    };
  
    this.newList = {
      name: null,
      id: null,
      meals: []
    };
  
    this.allMeals = [];
  

  this.getAllMeals();

  }

  public popupNewMealDialog(): void {
    const dialogRef = this.dialog.open(NewMealPopupComponent, {
      width: '300px',
      data: {ingredient: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if(result.ingredient){
        var newMeal = result.ingredient;
        this.newMeal.ingredients.push(newMeal);
      }
      // this.animal = result;
    });
  }

  public editIngredientMobile(index: number): void {
    console.log('editing', index);

    const dialogRef = this.dialog.open(NewMealPopupComponent, {
      width: '300px',
      data: {ingredient: this.newMeal.ingredients[index]}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed from editing');
      console.log(result);

      if(result.ingredient){
        this.newMeal.ingredients[index] = result.ingredient;
      }
      // this.animal = result;
    });
  }
  
  public removeIngredientMobile(index: number): void {
    this.newMeal.ingredients.splice(index, 1);
  }

  public handleEndNavigate(where: string, step: any): void {
    console.log(where);
    console.log(step);
    if(this.meal && !this.list){
      this.addMeal(step);
    } else if(this.list && !this.meal){
      this.addList(step);
    }

    if(where == "home"){
      this.resetChoice();
    } else if (where == 'list'){      
      this.resetChoice(true);
    } else if (where == 'home'){
      this.resetChoice(true);
    }


    

  }
  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

}