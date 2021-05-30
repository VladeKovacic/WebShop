import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../app.reducer';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationModel } from '../navigation.model';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$?: Observable<boolean>;
  navigation$: Observable<NavigationModel[]>;

  constructor(
    private store: Store<RootReducer.State>,
    private authService: AuthService,
    private navigationService: NavigationService
  ) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(RootReducer.getIsAuth);
    this.navigation$ = this.navigationService.getNavigation();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
