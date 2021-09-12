import { Component, OnInit } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { ExportedData, Ingredient, Meal, ShoppingList, StoreSection, UnitLabel } from 'src/app/models/meal';
import { ImportExportService } from 'src/app/services/import-export.service';
import { MealService } from 'src/app/services/meal.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {

  public selectedItems: any[];

  public importing: boolean = false;
  public exporting: boolean = false;

  public mealsToExport: Meal[] = []// [{name: "mealName", description: "Hello i am describing some stuff lorem ipsum losadfjkashdf", ingredients: [], id: null},{name: "mealName2",description: "Hello i am describing some stuff lorem ipsum losadfjkashdf", ingredients: [], id: null}];
  public listsToExport: ShoppingList[] = []//[{name: "testName", id: null, meals: [], description: "test test blah blah bla heres some test text"},{name: "testName2", id: null, meals: [], description: "test description sdlfkjasd j sfadjsdfjkl fa"}];

  public fileToUpload: File | null = null;

  public allData: [Meal[], ShoppingList[]];

  constructor(private importExportService: ImportExportService, private mealService: MealService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.allData = this.importExportService.getAll();
    this.mealsToExport = this.allData[0];
    this.listsToExport = this.allData[1];
  }

  public handleFileInput(files: any) {
    if(files.target.files[0].type == "application/json"){
      this.fileToUpload = files.target.files[0];
    } else {
      this._snackBar.open("Filetype not accepted!", "X");
    }
    
  }

  public instanceOfExportedData(object: any): object is ExportedData {
    return (('lists' in object) || ('meals' in object));
  }

  
  public uploadFile() {
    var success = true;  
    
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload, "UTF-8");
    fileReader.onload = () => {
      var res = fileReader.result as string;
      var saveObj: ExportedData = JSON.parse(res);

      // success = this.instanceOfExportedData(saveObj);

      

      if(this.instanceOfExportedData(saveObj)){
        this.importExportService.uploadFile(saveObj);
        this._snackBar.open('Imported Successfully!', 'X');
        this.fileToUpload = null;
      } else {
        this._snackBar.open('Import failed!', 'X');
      }
      
    }
    
    // console.log('success? :: ', success);
    
  }

  public selectionChange(change: MatSelectionListChange): void {
    console.log(change.option.value, change.option.selected);
    console.log("selected optioons:", this.selectedItems);
    
  }

  public exportData(): void {
    var data: ExportedData = {meals: [], lists: []};

    try{
      this.selectedItems.forEach(item => {
        console.log(item);
        var list = this.listsToExport.find(x => x == item);
        var meal = this.mealsToExport.find(x => x == item);
        
        if(list){
          data.lists.push(list);
        } else if (meal) {
          data.meals.push(meal);
        } else {

        }
  
        console.log(data)
      });
  
      if(data.meals.length > 0 || data.lists.length > 0){
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        saveAs(blob, 'my_shopper_data.json');
        this._snackBar.open("Exported Successfully!", "X");
      } else {
        this._snackBar.open("No data exported! (Possible duplicates)", "X");
      }
      
    } catch(ex) {
      this._snackBar.open("Error occurred", "X");
    }
   

    
  }
}
