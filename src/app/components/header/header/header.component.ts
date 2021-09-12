import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingList } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';
import { ImportExportComponent } from '../../util/import-export/import-export.component';
import { ThemeSwitcherComponent } from '../../util/theme-switcher/theme-switcher.component';
import { UnitConverterComponent } from '../../util/unit-converter/unit-converter.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public dialog: MatDialog) { 
    
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

  public popupUnitConverter(): void {
    const dialogRef = this.dialog.open(UnitConverterComponent, {
      height:'200px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log('closed dialog');
      console.log(res);
    });
  }

  public popupImportExport(): void {
    const dialogRef = this.dialog.open(ImportExportComponent, {
      // height:'300px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log('closed dialog');
      console.log(res);
    });
  }

  public popupThemeSwitcher(): void {
    const dialogRef = this.dialog.open(ThemeSwitcherComponent, {
      // height:'300px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe( res => {
      console.log('closed dialog');
      console.log(res);
    });
  }

}
