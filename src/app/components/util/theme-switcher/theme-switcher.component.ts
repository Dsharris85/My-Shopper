import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ThemeSwitcherService } from 'src/app/services/theme-switcher.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {

  title = 'theme-labo';
  darkMode$: Observable<boolean>;

  constructor(
    private themeService: ThemeSwitcherService
  ) { }

  ngOnInit() {
    this.darkMode$ = this.themeService.darkMode$;
  }

  setDarkMode(checked) {
    this.themeService.setDarkMode(checked);
  }

}
