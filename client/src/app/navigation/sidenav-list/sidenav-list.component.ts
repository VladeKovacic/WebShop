import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../app.reducer';
import { NavigationModel } from '../navigation.model';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$?: Observable<boolean>;
  navigation$: Observable<NavigationModel[]>;

  constructor(
    private authService: AuthService, 
    private store: Store<RootReducer.State>,
    private navigationService: NavigationService
  ) { }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(RootReducer.getIsAuth);
    this.navigation$ = this.navigationService.getNavigation();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
