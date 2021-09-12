import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Ingredient, StoreSection, UnitLabel } from 'src/app/models/meal';
import { autocomplete, FoodAutocompleteService } from 'src/app/services/food-autocomplete.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-new-meal-popup',
  templateUrl: './new-meal-popup.component.html',
  styleUrls: ['./new-meal-popup.component.css']
})
export class NewMealPopupComponent implements OnInit {

  public term$ = new BehaviorSubject<string>('');
  public results$: Observable<any> = this.term$.pipe(
        autocomplete(300, (term => this.fetchTerm(term)))
  )

  fetchTerm(term: string): Observable<any> {
    return this.autoCompleteService.getMatches(term, 5);
  }

  public unitLabels = UnitLabel; 
  public enumKeys=[];

  public sectionLabels = StoreSection; 
  public enumSections=[];

  // public ingredientName: string = "";
  // public ingredientAmount: number = null;
  public ingredientLabel: UnitLabel = this.unitLabels.whole;
  public ingredientSection: StoreSection = this.sectionLabels.Frozens;

  public ingredient: Ingredient;

  @ViewChild('iName') input:ElementRef; 
  // @ViewChild('iName')abc: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<NewMealPopupComponent>, 
    private autoCompleteService: FoodAutocompleteService) {
      this.enumKeys = Object.keys(this.unitLabels);
      this.enumSections = Object.keys(this.sectionLabels);
   }

  ngOnInit(): void {
    console.log("data?", this.data);
    if(this.data.ingredient){
      this.ingredient = this.data.ingredient;
    } else {
      this.ingredient = {
        name: "",
        unitAmount: null,
        unitLabel: this.unitLabels.oz,
        sectionOfStore: this.sectionLabels.Frozens
      }
    }
  }

  public addIngredient(): void {
    console.log(this.input);
    var newIngredient: Ingredient = {
      name: this.ingredient.name,
      unitAmount: this.ingredient.unitAmount,
      unitLabel: this.ingredient.unitLabel,
      sectionOfStore: this.ingredient.sectionOfStore
    }
    
    this.dialogRef.close({ingredient: newIngredient});
  }

  public unitChanged(event: MatSelectChange): void {
    // console.log('changed unit')
    // console.log(event)
    this.ingredient.unitLabel = event.value;
  }

  public sectionChanged(event: MatSelectChange): void {
    // console.log('changed unit')
    // console.log(event)
    this.ingredient.sectionOfStore = event.value;
  }

  public inputChange(change: any): void {
    this.term$.next(change.value)
  }
}


interface DialogData {
  ingredient: Ingredient;
}