import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as RootReducer from '../app.reducer';
import { BusyComponent } from './busy/busy.component';


@Injectable({
  providedIn: 'root'
})
export class BusyService implements OnDestroy {
  isLoadingSubscription: Subscription;
  overlayRef: OverlayRef;

  constructor(
    private store: Store<RootReducer.State>,
    private overlay: Overlay
  ) { }

  init() {
    this.isLoadingSubscription = this.store.select(RootReducer.getIsLoading).subscribe(isLoading => {
      if (isLoading) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  open() {
    var progressSpinnerOverlayConfig: OverlayConfig = {
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    };

    this.overlayRef = this.overlay.create(progressSpinnerOverlayConfig);
    const componentPortal = new ComponentPortal(BusyComponent);
    this.overlayRef.addPanelClass("example-overlay");
    this.overlayRef.attach(componentPortal);
  }

  close() {
    this.overlayRef.dispose();
  }
}
