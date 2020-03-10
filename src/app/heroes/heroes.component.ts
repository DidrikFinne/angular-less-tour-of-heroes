import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[]

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroesAsync();
  }

  //synchronous version left here for comparison
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  getHeroesAsync(): void {
    this.heroService.getHeroesAsync()
        .subscribe(heroes => this.heroes = heroes);
  }

}
