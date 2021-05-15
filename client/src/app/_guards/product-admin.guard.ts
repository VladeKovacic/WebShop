import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { LocalizationService } from '../_services/localization.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminGuard implements CanActivate {
  
  constructor(private accountService: AccountService, private toastr: ToastrService, private localizationService: LocalizationService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes('Admin') || user.roles.includes('ProductAdmin')) {
          return true;
        }
        this.toastr.error(this.localizationService.translate('You cannot enter this area'));
      })
    )
  }
  
}
