import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Ingredient, StoreSection, UnitLabel } from 'src/app/models/meal';

@Component({
  selector: 'app-new-meal-popup',
  templateUrl: './new-meal-popup.component.html',
  styleUrls: ['./new-meal-popup.component.css']
})
export class NewMealPopupComponent implements OnInit {

  public unitLabels = UnitLabel; 
  public enumKeys=[];

  public sectionLabels = StoreSection; 
  public enumSections=[];

  public ingredientName: string = "";
  public ingredientAmount: number = 0;
  public ingredientLabel: UnitLabel = this.unitLabels.Whole;
  public ingredientSection: StoreSection = this.sectionLabels.Frozens;

  constructor(public dialogRef: MatDialogRef<NewMealPopupComponent>) {
    this.enumKeys = Object.keys(this.unitLabels);
    this.enumSections = Object.keys(this.sectionLabels);
   }

  ngOnInit(): void {
  }

  public addIngredient(): void {
    var newIngredient: Ingredient = {
      name: this.ingredientName,
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
}
