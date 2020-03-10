import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  //old, synchronous version left here for comparison
  getHeroes(): Hero[] {
    this.messageService.add('HeroService: fetched heroes and returning as array');
    return HEROES;
  }

  getHeroesAsync(): Observable<Hero[]> {
    const heroes = this.getHeroes();
    this.messageService.add('HeroService: returning heroes array as Observable');
    return of(heroes);
  }

}
