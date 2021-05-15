import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getPaginatedResult } from '../_helpers/paginationHelper';
import { Product } from '../_models/product';
import { ProductParams } from '../_models/productParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  private productGroupsSource = new BehaviorSubject<Product[]>([]);
  productGroups$ = this.productGroupsSource.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {
    return getPaginatedResult<Product[]>(this.baseUrl + 'product', productParams, this.http);
  }

  addProduct(product: Product) {
    return this.http.put(this.baseUrl + 'product', product);
  }

  updateProduct(product: Product) {
    return this.http.post(this.baseUrl + 'product', product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.baseUrl + 'product/' + productId);
  }
}
