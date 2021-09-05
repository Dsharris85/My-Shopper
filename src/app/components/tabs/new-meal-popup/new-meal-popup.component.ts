import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  public ingredientName: string = "";
  public ingredientAmount: number = 0;
  public ingredientLabel: UnitLabel = this.unitLabels.Whole;
  public ingredientSection: StoreSection = this.sectionLabels.Frozens;

  @ViewChild('iName') input:ElementRef; 
  // @ViewChild('iName')abc: string;
  constructor(public dialogRef: MatDialogRef<NewMealPopupComponent>, private autoCompleteService: FoodAutocompleteService) {
    this.enumKeys = Object.keys(this.unitLabels);
    this.enumSections = Object.keys(this.sectionLabels);
   }

  ngOnInit(): void {
  }

  public addIngredient(): void {
    console.log(this.input);
    var newIngredient: Ingredient = {
      name: this.input.nativeElement.value,
      unitAmount: this.ingredientAmount,
      unitLabel: this.ingredientLabel,
      sectionOfStore: this.ingredientSection
    }
    
    this.dialogRef.close({ingredient: newIngredient});
  }

  public unitChanged(event: MatSelectChange): void {
    // console.log('changed unit')
    // console.log(event)
    this.ingredientLabel = event.value;
  }

  public sectionChanged(event: MatSelectChange): void {
    // console.log('changed unit')
    // console.log(event)
    this.ingredientSection = event.value;
  }

  public inputChange(change: any): void {
    this.term$.next(change.value)
  }
}
