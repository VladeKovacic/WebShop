import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../_models/user';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private currentUser: User;
  constructor(private store: Store<RootReducer.State>, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.select(RootReducer.getUser).pipe(take(1)).subscribe(user => this.currentUser = user);
    if (this.currentUser) {
      request = this.addToken(request, this.currentUser.token);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(this.currentUser).pipe(
        switchMap((user: any) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, user.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
