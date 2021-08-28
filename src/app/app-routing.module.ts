import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MealViewComponent } from './components/meal-view/meal-view.component';
import { ShoppingViewComponent } from './components/shopping-view/shopping-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shoppingList/:id', component: ShoppingViewComponent },
  { path: 'meal/:id', component: MealViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
