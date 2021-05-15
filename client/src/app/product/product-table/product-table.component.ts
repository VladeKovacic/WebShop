import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { ProductParams } from 'src/app/_models/productParams';
import { ProductService } from 'src/app/_services/product.service';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  products: Product[];
  productParams = new ProductParams();
  pagination = <Pagination>{};
  bsModalRef: BsModalRef;
  loading = false;

  constructor(private productService: ProductService, private modalService: BsModalService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(this.productParams).subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any) {
    if (this.productParams.pageNumber !== event.page) {
      this.productParams.pageNumber = event.page;
      this.loadProducts();
    }
  }

  openEditProductModal(product: Product) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        product: product
      }
    };

    this.bsModalRef = this.modalService.show(ProductEditModalComponent, config);
    this.bsModalRef.content.updateProduct.subscribe(values => {
      console.log(values);
    })
  }

  openAddProductModal() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        product: <Product>{}
      }
    };

    this.bsModalRef = this.modalService.show(ProductEditModalComponent, config);
    this.bsModalRef.content.updateProduct.subscribe(product => {
      this.productService.addProduct(product).subscribe((product: Product) => {
        this.toastr.info("You added new product " + product.name);
        this.loadProducts();
      });
    })
  }
}
