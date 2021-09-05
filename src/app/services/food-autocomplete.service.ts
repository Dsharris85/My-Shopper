import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/api';
import {debounceTime, switchMap, takeUntil, skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodAutocompleteService {

  constructor(public http: HttpClient) { }

  public getMatches(query: string, limit: number = 3): Observable<any> {
    return this.http.get(`https://api.edamam.com/auto-complete?app_id=${api.appID}&app_key=${api.appKey}&q=${query}&limit=${limit}`);
  }
}

export const autocomplete = (time, selector) => (source$) =>
  source$.pipe(
    debounceTime(time),
    switchMap((...args: any[]) => 
      selector(...args)
        .pipe(
            takeUntil(
                source$
                    .pipe(
                        skip(1)
                    )
            )
        )
    )
  )
