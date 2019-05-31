import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Result } from './result';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ResultService {
    query: any;
    resultsUrl: string;

    constructor(private http: HttpClient){};

    setQuery(query: string) {
        this.query = query;
    }

    makeUrlPortion(): string {
        let formattedQuery: string = '';
        
        if(this.query == ''){
            return '';
        }

        for(let i in this.query){
            if(this.query.charAt(i) == ' '){
                formattedQuery += '%20';
            } else  {
                formattedQuery += this.query.charAt(i);
            }
        }
        return formattedQuery;
    }
   
    getResults() : Observable<Result[]> {
        this.resultsUrl = 'https://my.career.place/api/occupations?filter=%7B"search"%3A"' + this.makeUrlPortion() + '*"%2C"limit"%3A10%2C"skip"%3A0%7D';
        
        return this.http.get<Result[]>(this.resultsUrl)
        .pipe(
            retry(3), catchError(this.handleError)
          );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          
          console.error('An error occurred:', error.error.message);
        } else {
         
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
      
        return throwError(
          'Something bad happened; please try again later.');
      };
}

