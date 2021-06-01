import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/shared/confirm.service';
import { UiService } from 'src/app/shared/ui.service';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductTableComponent } from '../product-table/product-table.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.css']
})
export class ProductAdministrationComponent implements OnInit {
  bsModalRef: BsModalRef;
  selectedProduct: Product;
  @ViewChild(ProductTableComponent) table: ProductTableComponent;

  constructor(
    private productService: ProductService,
    // private modalService: BsModalService,
    // private toastr: ToastrService,
    private uiService: UiService,
    private confirmService: ConfirmService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSelectRowChanged(selectedProduct: Product) {
    this.selectedProduct = selectedProduct;
  }

  deleteSelectedProduct() {
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
      if (result) {
        this.productService.deleteProduct(this.selectedProduct.id).subscribe(result => {
          if (result) {
            this.loadProducts();
          }
        });
      }
    });
  }

  openProductModal(isNew: boolean = true) {
    var config: MatDialogConfig<Product> = {
      width: "100vw",
      height: "100vh",
      maxWidth: "600px",
      maxHeight: "400px",
      data: null
    };

    if (!isNew) {
      config.data = { ...this.selectedProduct };
    } else {
      config.data = {
        id: 0,
        name: null,
        price: null,
        productGroupId: null,
        quantity: null
      };
    }

    const dialogRef = this.dialog.open(ProductEditModalComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.group("Prduct edit result");
      console.log(this.selectedProduct);
      console.log(result);
      console.groupEnd();
      this.selectedProduct = result;
      if (isNew) {
        this.productService.addProduct(this.selectedProduct).subscribe((product: Product) => {
          this.uiService.successMessage("You added new product " + product.name);
          this.loadProducts();
        });
      } else {
        this.productService.updateProduct(this.selectedProduct).subscribe((product: Product) => {
          this.uiService.successMessage("You updated product " + product.name);
          this.loadProducts();
        });
      }
    });
  }

  private loadProducts() {
    this.table.loadProducts();
  }
}
