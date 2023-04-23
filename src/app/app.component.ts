import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppState } from './reducers';
import { Store, select } from '@ngrx/store';
import { login, logout } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { UserService } from './auth/user.service';
import { selectAllTutorials } from './tutorials/tutorials.selectors';
import { loadAllTutorials } from './tutorials/tutorials.actions';
import { FeedHttpService } from './feed/feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = true;

  isLoggedIn$!: Observable<boolean>;

  isLoggedOut$!: Observable<boolean>;

  constructor(private router: Router,
              private store: Store<AppState>,
              public user: UserService) {

  }

  ngOnInit() {

      const userProfile = localStorage.getItem("user");

      if (userProfile) {
          this.store.dispatch(login({user: JSON.parse(userProfile)}));
          this.store.dispatch(loadAllTutorials());
      }

      this.router.events.subscribe(event => {
          switch (true) {
              case event instanceof NavigationStart: {
                  this.loading = true;
                  break;
              }

              case event instanceof NavigationEnd:
              case event instanceof NavigationCancel:
              case event instanceof NavigationError: {
                  this.loading = false;
                  break;
              }
              default: {
                  break;
              }
          }
      });

      this.isLoggedIn$ = this.store
          .pipe(
              select(isLoggedIn)
          );

      this.isLoggedOut$ = this.store
          .pipe(
              select(isLoggedOut)
          );
  }

  logout() {

      this.store.dispatch(logout());

  }

}
