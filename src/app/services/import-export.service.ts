import { Injectable } from '@angular/core';
import { ExportedData, Meal, ShoppingList } from '../models/meal';
import { MealService } from './meal.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor(private mealService: MealService) { }

  public uploadFile(data: ExportedData): void {
    console.log('upload: ', data);
   
    if(data.lists){
      data.lists.forEach(list => {
        if(this.mealService.getList(list.id)){
          console.log('already have list saved!')
        } {
          this.mealService.saveNewList(list, list.id)
        }
      });
    }
    
    if(data.meals){
      data.meals.forEach(meal => {
        if(this.mealService.getMeal(meal.id)){
          console.log('already have meal saved!')
        } {
          this.mealService.saveNewMeal(meal, meal.id)
        }
      });
    }
  }
  // public instanceOfExportedData(object: any): object is ExportedData {
  //   return (('lists' in object) || ('meals' in object));
  // }
  // public uploadFile(file: File): boolean {
  //   console.log('upload: ', file);
  //   var success = true;

  //   if (file.type != 'application/json') {
  //     return false;
  //   }

  //   try {
  //     // const fileReader = new FileReader();
  //     // fileReader.readAsText(file, "UTF-8");
  //     // fileReader.onload = () => {
  //     //   var res = fileReader.result as string;
  //       // var saveObj: ExportedData = JSON.parse(file.text);
  //       // var saveObj: ExportedData = <ExportedData>fileReader.result;

      
        
        
  //       // console.log(JSON.parse(saveObj));
  //       // console.log(typeof(saveObj));
  //       // console.log('instance of?')
  //       // console.log((saveObj));
  //       // console.log(this.instanceOfExportedData(saveObj));
  
  //       // success = this.instanceOfExportedData(saveObj);
  //       // if(!success){
  //       //   return success;
  //       // }
  //       // if(this.instanceOfExportedData(saveObj) == false){
  //       //   success = false;
  //       // }
  
  //       // if(!(saveObj.meals && saveObj.lists)){
  //       //   success = false;
  //       // }
  
  //       if(saveObj.lists){
  //         saveObj.lists.forEach(list => {
  //           if(this.mealService.getList(list.id)){
  //             console.log('already have list saved!')
  //           } {
  //             this.mealService.saveNewList(list, list.id)
  //           }
  //         });
  //       }
        
  //       if(saveObj.meals){
  //         saveObj.meals.forEach(meal => {
  //           if(this.mealService.getMeal(meal.id)){
  //             console.log('already have meal saved!')
  //           } {
  //             this.mealService.saveNewMeal(meal, meal.id)
  //           }
  //         });
  //       }

        
        
  //     //}
  
  //     // fileReader.onerror = (error) => {
  //     //   console.log(error);
  //     // }
  //   } catch(ex) {
  //     console.log('error', ex);
  //     success = false;
  //   }
    
  //   console.log('returning: ', success);
  //   return success;
  //   // const fileReader = new FileReader();
  //   // fileReader.readAsText(file, "UTF-8");
  //   // fileReader.onload = () => {
  //   //   var res = fileReader.result as string;
  //   //   var saveObj: ExportedData = JSON.parse(res);
  //   //   // var saveObj: ExportedData = <ExportedData>fileReader.result;
      
      
  //   //   // console.log(JSON.parse(saveObj));
  //   //   console.log(typeof(saveObj));
  //   //   console.log((saveObj));


  //   //   saveObj.lists.forEach(list => {
  //   //     if(this.mealService.getList(list.id)){
  //   //       console.log('already have list saved!')
  //   //     } {
  //   //       this.mealService.saveNewList(list)
  //   //     }
  //   //   });
      
  //   //   saveObj.meals.forEach(meal => {
  //   //     if(this.mealService.getMeal(meal.id)){
  //   //       console.log('already have meal saved!')
  //   //     } {
  //   //       this.mealService.saveNewMeal(meal)
  //   //     }
  //   //   });
  //   // }

  //   // fileReader.onerror = (error) => {
  //   //   console.log(error);
  //   // }


  // }

  public getAll(): [Meal[], ShoppingList[]] {

    var meals: Meal[] = [];
    var lists: ShoppingList[] = [];

    Object.keys(localStorage).forEach(key => {
      if(key.includes('MEAL_')){
        // console.log(`\n\nKV:`);
        // console.log(localStorage.getItem(key));
        // console.log(key);
        meals.push(JSON.parse(localStorage.getItem(key)))
      } else if(key.includes('LIST_')){
        lists.push(JSON.parse(localStorage.getItem(key)))
      }
    });

    return [meals, lists];
  }
}
