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

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
 
  }

  ngOnDestroy() {
  }

  public refresh(): void {
    window.location.reload();
  }

  public cleanHomePage(): void {
    // TODO: will get out of hand, need to do this better :P
    if(window.location.href.includes('meal') || window.location.href.includes('shoppingList') ){
      this.router.navigate([''])
    } else {
      this.refresh();
    }
  }

}
