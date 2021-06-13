import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ProductAdministrationComponent } from './product/product-administration/product-administration.component';
import { HasRoleDirective } from './navigation/has-role.directive';
import { ProductTableComponent } from './product/product-table/product-table.component';
import { ProductEditModalComponent } from './product/product-edit-modal/product-edit-modal.component';
import { TreeModule } from './_modules/tree-module/tree.module';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './shared/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MyTelInput } from './shared/example-tel-input-example/example-tel-input-example';
import { TreeInputControlComponent } from './shared/tree-input-control/tree-input-control.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    ShopComponent,
    ShopListComponent,
    ShopCardComponent,
    AboutComponent,
    ShopSaleComponent,
    ProductAdministrationComponent,
    HasRoleDirective,
    ProductTableComponent,
    ProductEditModalComponent,
    SigninComponent,
    LoginComponent,
    MyTelInput,
    TreeInputControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
