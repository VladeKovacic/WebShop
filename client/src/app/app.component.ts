import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { ProductGroupService } from './product/product-group.service';
import { BusyService } from './shared/busy.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = environment.appName;
  users: any;
  
  constructor(
    private productGroupService: ProductGroupService,
    private authService: AuthService,
    private busy: BusyService
  ) { }
  
  ngOnInit() {
    this.productGroupService.loadProductGroupTree();
    this.authService.initUserFromStore();
    this.authService.initAuthListener();    
    this.busy.init();
  }
}
