import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducer';
import * as UiActions from '../shared/ui.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<RootReducer.State>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(new UiActions.StartLoading());
    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(new UiActions.StopLoading());
      })
    )
  }
}
