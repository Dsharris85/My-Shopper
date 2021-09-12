import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YesNoComponent } from 'src/app/components/util/yes-no/yes-no.component';
import { DataUpdateNotificationType } from 'src/app/models/dataNotifications';
import { Meal, ShoppingList } from 'src/app/models/meal';
import { DataUpdateNotifierService } from 'src/app/services/data-update-notifier.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-lists-tab',
  templateUrl: './lists-tab.component.html',
  styleUrls: ['./lists-tab.component.css']
})
export class ListsTabComponent implements OnInit {

  public allLists: ShoppingList[] = []; 
  public allMeals: Meal[] = []; 

  @Input()
  public mobileMode: boolean; 

  constructor(private mealService: MealService, public dialog: MatDialog, private notifierService: DataUpdateNotifierService) { }

  ngOnInit(): void {
    this.getAllMeals();
    this.getAllLists();

    this.notifierService.notification.subscribe((notification: DataUpdateNotificationType) => {
      this.handleNotification(notification);
    });
  }

  public handleNotification(notification: DataUpdateNotificationType) {
    switch(notification){
      case 0: 
        console.log('new list')
        this.getAllLists();
        break;     
      case 3: 
        console.log('delete meal');
        this.getAllLists();
        this.getAllMeals();
        break;
    }
  }

  popupYesNo(id: string) {
    let dialogRef = this.dialog.open(YesNoComponent, {
      data: {
        id: id
      }
    });

    const sub = dialogRef.componentInstance.deleteThis.subscribe(id => {
      // do something
      console.log(`deleted = ${id}`);
      this.deleteList(id);
    });
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      dialogRef.componentInstance.deleteThis.unsubscribe();
      console.log(`unsubbed!`);
    });
  }
  
  public getAllMeals(): void {   
    this.allMeals = this.mealService.getAllMeals();
  }
  
  public getAllLists(): void {   
    this.allLists = this.mealService.getAllLists();

    this.allLists.forEach(list => {
      if(!list.mealObjects){
        list.mealObjects = [];
        list.meals.forEach(mealID => {
          // console.log(`id:: ${mealID}`);
          var meal = this.mealService.getMeal(mealID);
          // console.log(`meal: `, meal);
          list.mealObjects.push(meal)
        })
      }
    })


  }

  public openList(id: string): void {
    
  }

  public deleteList(id: string): void {
    this.mealService.deleteList(id);
    this.allLists = this.allLists.filter(list => list.id != id);
  }

}
