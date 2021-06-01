import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductGroup } from './productGroup.model';
import { ProductGroupTree } from './productGroupTree.model';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {
  baseUrl = environment.apiUrl;
  private productGroupsSource = new BehaviorSubject<ProductGroupTree[]>([]);
  productGroups$ = this.productGroupsSource.asObservable();

  constructor(private http: HttpClient) { }

  loadProductGroupTree() {
    this.getProductGroupTree().pipe(take(1)).subscribe(productGroups => {
      this.productGroupsSource.next(productGroups);
    });
  }

  getProductGroup(parentId?: number) {
    var url = "ProductGroup";

    if (parentId) {
      url = url + "/" + parentId;
    }

    return this.http.get<ProductGroup[]>(this.baseUrl + url);
  }

  private getProductGroupTree() {
    return this.http.get<ProductGroupTree[]>(this.baseUrl + "ProductGroup/tree");
  }
}
