import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopSaleComponent } from './shop/shop-sale/shop-sale.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sale', component: ShopSaleComponent },
  { path: 'shop', component: ShopListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
