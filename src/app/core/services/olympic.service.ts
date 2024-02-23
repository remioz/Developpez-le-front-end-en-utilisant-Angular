import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }
  getOlympics() {
    return this.olympics$.asObservable();
  }
  getCountryDetails(country: string):Observable<OlympicCountry | undefined>{
    return this.olympics$.pipe(
      map(
        olympics => olympics.find(olympic => olympic.country === country)
      )
    );  
  }
  isValidCountry(country:string):boolean{
    let countries : OlympicCountry[] = [];
    this.olympics$.subscribe({next(value) {
        countries = value;
        },
    })
    const myOlympic = countries.find(mycountry => mycountry.country === country)
    if(myOlympic){
       return countries.includes(myOlympic)
    }else{
       return false;
    }
  }
}
