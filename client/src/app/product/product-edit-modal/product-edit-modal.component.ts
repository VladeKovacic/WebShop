import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {
  @Input() updateProduct = new EventEmitter();
  product: Product;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  update() {
    this.updateProduct.emit(this.product);
    this.bsModalRef.hide();
  }
}
