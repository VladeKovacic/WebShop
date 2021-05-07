import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ShopComponent } from './shop/shop/shop.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopCardComponent } from './shop/shop-card/shop-card.component';
import { AboutComponent } from './about/about.component';
import { ShopSaleComponent } from './shop/shop-sale/shop-sale.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    ShopListComponent,
    ShopCardComponent,
    AboutComponent,
    ShopSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
