import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import * as convert from 'node_modules/recipe-unit-converter';
import { UnitLabel } from 'src/app/models/meal';

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent implements OnInit {

  public unitLabels = UnitLabel; 
  public enumKeys=[];

  public fromAmount: number;
  public toAmount: string;

  public fromUnit: string;
  public toUnit: string;
  
  public errored: boolean = false;
  
  constructor() { 
    this.enumKeys = Object.keys(this.unitLabels);
  }

  ngOnInit(): void {
  }

  public unit1Changed(event: MatSelectChange): void {
    this.fromUnit = event.value;
    this.tryConvert();
  }

  public unit2Changed(event: MatSelectChange): void {
    this.toUnit = event.value;
    this.tryConvert();
  }
  
  public tryConvert(): void {
    this.errored = false;
    if(this.fromAmount > 0 && this.fromAmount && this.toUnit){
      try{
        this.toAmount = convert(this.fromAmount).from(this.fromUnit).to(this.toUnit);
      }catch(error) {
        console.log(error);
        this.errored = true;
      }
    }
    // console.log(errored);
    // if(errored){
    //   this.toAmount = "hi";
    //   this.toAmount = `Error in conversion`;
    // }
  }

}
