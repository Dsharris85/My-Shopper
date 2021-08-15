import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingList } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public mealList: ShoppingList = {
    name: null,
    meals: null,
    id: null
  };

  public id: string;
  private routeSub: Subscription;
  
  constructor(private _Activatedroute:ActivatedRoute, private mealService: MealService, private router: Router) { 
    
  }

  ngOnInit(): void {
    // this.router.events.subscribe(val=> {
    //   if (val instanceof NavigationEnd) {
    //   let curUrlTree: UrlTree = this.router.parseUrl(this.router.url);
    //   this.id = curUrlTree.root.children.primary.segments[1].path;
    //   }
    // });   
  }

  ngOnDestroy() {
    // this.routeSub.unsubscribe();
  }

  public refresh(): void {
    // console.log(`this id = ${this.id}`);
    // this.router.navigate(['']);
    // if(this.id){
    //   this.router.navigate(['']);
    // } else {
    // }
    window.location.reload();
  }

}
