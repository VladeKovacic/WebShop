import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductGroup } from '../_models/productGroup';
import { AuthService } from '../auth/auth.service';
import { LocalizationService } from '../_services/localization.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootReducer from '../app.reducer';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed: boolean = true;
  loginToggle: boolean = false;
  model: any = {};
  productGroups: ProductGroup[];
  title = environment.appName;
  isAuth$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    public accountService: AuthService,
    public loc : LocalizationService,
    private router: Router,
    private store: Store<RootReducer.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(RootReducer.getIsAuth);
    this.user$ = this.store.select(RootReducer.getUser);
  }

  logout() {
    this.accountService.logout();
    this.loginToggle = false;
    this.router.navigateByUrl('/');
  }
}
