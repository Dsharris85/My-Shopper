import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './components/header/header/header.component';
import { NewTabComponent } from './components/tabs/new-tab/new-tab/new-tab.component';
import { MealsTabComponent } from './components/tabs/meals-tab/meals-tab/meals-tab.component';
import { ListsTabComponent } from './components/tabs/lists-tab/lists-tab/lists-tab.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'node_modules/file-saver'
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { TestPageComponent } from './test-page/test-page.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShoppingViewComponent } from './components/shopping-view/shopping-view.component';
import { HomeComponent } from './components/home/home.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { YesNoComponent } from './components/util/yes-no/yes-no.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmptyErrorComponent } from './components/util/empty-error/empty-error.component';
import {MatMenuModule} from '@angular/material/menu';
import { MealViewComponent } from './components/meal-view/meal-view.component';
import { NewMealPopupComponent } from './components/tabs/new-meal-popup/new-meal-popup.component';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewTabComponent,
    MealsTabComponent,
    ListsTabComponent,
    TestPageComponent,
    ShoppingViewComponent,
    HomeComponent,
    YesNoComponent,
    EmptyErrorComponent,
    MealViewComponent,
    NewMealPopupComponent,
  ],
  imports: [
    // Angular Materials
    MatSliderModule,
    BrowserAnimationsModule,    
    MatTabsModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule,
    MatRippleModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    // Defaults
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MatAutocompleteModule,
    // Service Worker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'    
    })    
  ],
  exports: [
    //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
