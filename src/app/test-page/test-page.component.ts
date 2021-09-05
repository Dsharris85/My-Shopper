import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { autocomplete, FoodAutocompleteService } from '../services/food-autocomplete.service';

// export const autocomplete = (time, selector) => (source$) =>
//   source$.pipe(
//     debounceTime(time),
//     switchMap((...args: any[]) => 
//       selector(...args)
//         .pipe(
//             takeUntil(
//                 source$
//                     .pipe(
//                         skip(1)
//                     )
//             )
//         )
//     )
//   )

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  public term$ = new BehaviorSubject<string>('');
  public results$: Observable<any> = this.term$.pipe(
        autocomplete(300, (term => this.fetch(term)))
  )

  constructor(private autoCompleteService: FoodAutocompleteService) {
  }

  ngOnInit() {
  }

  public debug(event: any): void {
    console.log(event.value)
  }

  fetch(term: any): Observable<any> {
    return this.autoCompleteService.getMatches(term.value, 5);
  }

}
