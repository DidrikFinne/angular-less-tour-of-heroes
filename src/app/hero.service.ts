import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //old, synchronous version no longer supported
  getHeroes(): Hero[] {
    const HEROES = [];
    this.log('synchronous hero retrieval attempted but no longer supported');
    return HEROES;
  }

  /** Notice that the Observable response is just one item (the response from the server)
   * and that the one item is an array of heroes. Don't be misled into thinking it's many
   * indivually observable heroes */
  getHeroesAsync(): Observable<Hero[]> {
    const observableOfHeroes = this.http.get<Hero[]>(this.heroesUrl);
    this.log('established http.get for Observable heroes');
    return observableOfHeroes
      .pipe(
        tap(h => this.log(`fetched ${h.length} heroes`)),
        catchError(this.handleError<Hero[]>('getHeroes', [])),
        tap(h => this.log(`tapped into ${h.length} heroes observable again`)),
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHeroAsync(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(h => this.log(`fetched hero id=${id} and noticed that it was hero with ID ${h.id} and name ${h.name}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
