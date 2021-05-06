import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed: boolean = true;
  loginToggle: boolean = false;
  model: any = {};

  constructor(
    public accountService: AccountService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.loginToggle = false;
      this.model = {};
      this.router.navigateByUrl('/');
    });
  }

  logout() {
    this.accountService.logout();
    this.loginToggle = false;
    this.router.navigateByUrl('/');
  }
}
