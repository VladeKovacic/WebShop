import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as UiActions from '../shared/ui.actions';
import * as RootReducer from '../app.reducer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<RootReducer.State>,
    private uiService: UiService
  ) { }

  initAuthListener() {
    this.store.select(RootReducer.getIsAuth).subscribe(isAuth => {
      if (isAuth) {
        this.router.navigate(['/shop']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
      .pipe(take(1))
      .subscribe((response: User) => {
        this.store.dispatch(new UiActions.StopLoading());
        this.setCurrentUser(response);
      },
        error => {
          this.store.dispatch(new UiActions.StopLoading());
          this.uiService.showSnackbar(error.message, 3000);
        });
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  refreshToken(model: any) {
    return this.http.post(this.baseUrl + 'account/refresh', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.store.dispatch(new AuthActions.SetUnauthenticated());
  }

  initUserFromStore() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.store.dispatch(new AuthActions.SetAuthenticated(user));
    }
  }

  private setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.store.dispatch(new AuthActions.SetAuthenticated(user));
  }

  private getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
