import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  //old, synchronous version left here for comparison
  getHeroes(): Hero[] {
    return HEROES;
  }

  getHeroesAsync(): Observable<Hero[]> {
    return of(HEROES);
  }

}
