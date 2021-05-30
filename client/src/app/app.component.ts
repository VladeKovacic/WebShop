import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { ProductGroupService } from './_services/product-group.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productGroupService.loadProductGroupTree();
    this.authService.initUserFromStore();
    this.authService.initAuthListener();
  }
}
