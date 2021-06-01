import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_helpers/pagination/pagination';
import { Product } from 'src/app/product/product.model';
import { ProductParams, SortDirection } from '../productParams.model';
import { ConfirmService } from 'src/app/shared/confirm.service';
import { ProductService } from 'src/app/product/product.service';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePageEvent } from '@angular/material/table';
import { debounce, debounceTime, distinctUntilChanged, filter, take, tap } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  @Output() selectedRow: Observable<Product>;
  productParams = new ProductParams();
  pagination = <Pagination>{};

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  displayedColumns: string[] = ['name', 'price', 'quantity'];
  dataSource = new MatTableDataSource<Product>();

  private selectedRowSubject = new Subject<Product>();

  constructor(
    private productService: ProductService
  ) {
    this.selectedRow = this.selectedRowSubject.asObservable();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        tap((text) => {
          console.log(this.filter.nativeElement.value);
          this.filterProducts(this.filter.nativeElement.value);
        })
      )
      .subscribe();
  }

  selectedRowChanged(row: Product) {
    this.selectedRowSubject.next(row);
  }

  filterProducts(filterText: string) {
    this.productParams.searchString = filterText;
    this.productParams.pageNumber = 1;
    this.paginator.firstPage();
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.productParams).pipe(take(1)).subscribe(response => {
      this.dataSource.data = response.result;
      this.pagination = response.pagination;
      this.selectedRowSubject.next(null);
    });
  }

  onPaginateChange(event: MatTableDataSourcePageEvent) {
    this.productParams.pageNumber = event.pageIndex + 1;
    this.productParams.pageSize = event.pageSize;
    this.loadProducts();
  }

  sortData(event: Sort) {
    this.productParams.sortColumn = event.active;
    this.productParams.sortDirection = <SortDirection>event.direction;
    this.loadProducts();
  }
}
