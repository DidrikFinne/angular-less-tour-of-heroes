import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  baseTitle = 'Tour of Heroes';

  public constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(_ => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return null;
        })
      ).subscribe((routeTitle: string) => {
        this.setTitle(routeTitle);
      });
  }

  public setTitle( newTitle: string) {
    const fullTitle = newTitle
    ? `${this.baseTitle} - ${newTitle}`
    : this.baseTitle;
    this.titleService.setTitle(fullTitle);
  }
}
