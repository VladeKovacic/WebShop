import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalizationService } from '../_services/localization.service';
import * as RootReducer from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminGuard implements CanActivate {
  
  constructor(private store: Store<RootReducer.State>, private toastr: ToastrService, private localizationService: LocalizationService) { }

  canActivate(): Observable<boolean> {
    return this.store.select(RootReducer.getUser).pipe(
      map(user => {
        if (user?.roles.includes('Admin') || user?.roles.includes('ProductAdmin')) {
          return true;
        }
        this.toastr.error(this.localizationService.translate('You cannot enter this area'));
      })
    )
  }
  
}
