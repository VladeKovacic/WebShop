import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/_models/product';
import { ProductGroup } from 'src/app/_models/productGroup';
import { TreeNode } from 'src/app/_modules/tree-module/models/treeNode';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {
  @Input() updateProduct = new EventEmitter();
  public selectedTreeNode: TreeNode | null;
  product: Product;
  productGroup: ProductGroup;
  data: TreeNode[] = [
    {
      "id": 5,
      "name": "First name",
      "parentId": null
    },
    {
      "id": 1,
      "name": "Second name",
      "parentId": 5
    },
    {
      "id": 6,
      "name": "Third name",
      "parentId": 1
    },
    {
      "id": 15,
      "name": "Fourth name",
      "parentId": null
    },
    {
      "id": 25,
      "name": "Fifth name",
      "parentId": 5
    }
  ];

  constructor(public bsModalRef: BsModalRef) {
    this.selectedTreeNode = null;
  }

  ngOnInit(): void {
  }

  setProductGroup(productGroup: ProductGroup) {
    this.productGroup = productGroup;
    this.product.productGroupId = productGroup.id;
  }

  update() {
    this.updateProduct.emit(this.product);
    this.bsModalRef.hide();
  }

  public handleSelection(node: TreeNode): void {
    this.selectedTreeNode = node;
  }
}
