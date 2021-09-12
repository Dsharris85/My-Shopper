import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { YesNoComponent } from 'src/app/components/util/yes-no/yes-no.component';
import { DataUpdateNotificationType } from 'src/app/models/dataNotifications';
import { Meal, UnitLabel } from 'src/app/models/meal';
import { DataUpdateNotifierService } from 'src/app/services/data-update-notifier.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.component.html',
  styleUrls: ['./meals-tab.component.css']
})
export class MealsTabComponent implements OnInit {

  public notifyTypes = DataUpdateNotificationType;

  public mealFormGroup: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required,  Validators.maxLength(40)]],
    description: ['', Validators.maxLength(100)],  
    iAmount: this._formBuilder.array([['', [Validators.maxLength(3), Validators.required]]]),
    iUnit: this._formBuilder.array([['', [Validators.required]]]),
    iName: this._formBuilder.array([['', [Validators.maxLength(40), Validators.required]]]),
  });
 

  public allMeals: Meal[] = [];

  public unitLabels = UnitLabel; 
  public enumKeys=[];
  
  @Input()
  public mobileMode: boolean;

  constructor(private _formBuilder: FormBuilder, private mealService: MealService, public dialog: MatDialog, private notifierService: DataUpdateNotifierService) { 
    this.enumKeys = Object.keys(this.unitLabels);
  }

  popupYesNo(id: string) {
    let dialogRef = this.dialog.open(YesNoComponent, {
      data: {
        id: id
      }
    });

    dialogRef.componentInstance.deleteThis.subscribe(id => {
      // do something
      console.log(`deleted = ${id}`);
      this.removeMeal(id);
    });

    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      dialogRef.componentInstance.deleteThis.unsubscribe();
      console.log(`unsubbed!`);
    });
  }


  ngOnInit(): void {
    this.getAllMeals();

    this.notifierService.notification.subscribe((notification: DataUpdateNotificationType) => {
      console.log('Noting!');
      console.log(notification);
      this.handleNotification(notification);
    });
    
    // this.dialog.afterAllClosed.subscribe( closed => {
    //   console.log(`closed`, closed);
    // });

  }

  get iUnit() {
    return (<FormArray>this.mealFormGroup.get('iUnit'));
  }
  
  get iAmount() {
    return (<FormArray>this.mealFormGroup.get('iAmount'));
  }
  
  get iName() {
    return (<FormArray>this.mealFormGroup.get('iName'));
  }
  
  public getAllMeals(): void {
    this.allMeals = this.mealService.getAllMeals();
    this.allMeals.forEach(meal => {
      meal.editing = false;
    })
    // this.allMeals.sort((a: Meal, b: Meal) => (a.name < b.name ? -1 : 1));
  }

  public editMeal(id: string): void { 
    this.allMeals.forEach(meal => meal.editing = false);
    this.allMeals.find(meal => meal.id == id).editing = true;

    this.mealFormGroup.get('iAmount')['controls'] = [];//.pop();
    this.mealFormGroup.get('iName')['controls'] = [];//.pop();
    this.mealFormGroup.get('iUnit')['controls'] = [];//.pop();

    this.allMeals.find(meal => meal.id == id).ingredients.forEach(ingredient => {
        this.iUnit.push(this._formBuilder.control(ingredient.unitLabel, Validators.required));
        this.iName.push(this._formBuilder.control(ingredient.name, Validators.required));
        this.iAmount.push(this._formBuilder.control(ingredient.unitAmount, Validators.required));
    });
    

    console.log(`fg`);
    console.log(this.iUnit);
    console.log(this.iAmount);
    console.log(this.iName);
  }

  public removeMeal(id: string): void {
    console.log('removing : ', id)
    this.allMeals = this.allMeals.filter(meal => meal.id != id)
    this.mealService.deleteMeal(id);
  }

  public panelOpened(id: string): void {
    console.log(`open`);
    //this.allMeals.find(meal => meal.id == id).editing = true;
  }

  public panelClosed(id:string): void {
    console.log(`closed`);
    this.allMeals.find(meal => meal.id == id).editing = false;
  }

  public submitEdit(id:string): void {
    console.log(`id == ${id}`);
    var meal: Meal = {
      ingredients: [],
      name: this.mealFormGroup.value['name'],
      description: this.mealFormGroup.value['description'],
      id: id
    };

    // meal.name = this.mealFormGroup.value['name'][0];
    // meal.description = this.mealFormGroup.value['description'][0];

    for (var i = 0; i < this.mealFormGroup.value['iAmount'].length; i++){
      meal.ingredients.push({
        name: this.mealFormGroup.value['iName'][i],
        unitAmount: this.mealFormGroup.value['iAmount'][i],
        unitLabel: this.mealFormGroup.value['iUnit'][i]
      })
    }


    console.log(`new saved edit`);
    console.log(meal);

    // delete old one by id,
    // create new one w/same id

    this.mealService.deleteMeal(id);
    this.mealService.saveNewMeal(meal, id)

    this.allMeals.find(meal => meal.id == id).editing = false;

  }

  public cancelEdit(id:string): void {
    this.allMeals.find(meal => meal.id == id).editing = false;
  }

  public selectNumber(emailNumbers) {
    const difference = this.iUnit.length - emailNumbers;
    difference > 0 ? this.removeIngredients(difference) : this.addIngredients(difference);
  }

  public removeIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(item => {
        this.iUnit.removeAt(this.iUnit.length - 1);
        this.iName.removeAt(this.iUnit.length - 1);
        this.iAmount.removeAt(this.iUnit.length - 1);
      });
  }

  public addIngredients(difference) {
    this.createCustomLengthArray(difference)
      .forEach(
        item => {
          this.iUnit.push(this._formBuilder.control(null, Validators.required));
          this.iName.push(this._formBuilder.control(null, Validators.required));
          this.iAmount.push(this._formBuilder.control(null, Validators.required));
        }
      );
  }

  public createCustomLengthArray(length) {
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

  public handleNotification(notification: DataUpdateNotificationType): void {
    switch(notification){
      case 1: 
        console.log('new meal')
        console.log(this.notifyTypes[notification]);
        this.getAllMeals();
        break;
    }
  }
}
