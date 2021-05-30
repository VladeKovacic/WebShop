import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as RootReducer from '../app.reducer';
import { Role } from './role';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole: Role;
  userSubscription: Subscription;
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private store: Store<RootReducer.State>
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select(RootReducer.getUser).subscribe(user => {
      if (this.appHasRole.onlyAnonymous) {
        if (user) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        } else {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        }
      } else {
        if (!user && this.appHasRole.hasRoles) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }

        if (user?.roles.some(r => this.appHasRole.roles.includes(r)) || !this.appHasRole.hasRoles) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
