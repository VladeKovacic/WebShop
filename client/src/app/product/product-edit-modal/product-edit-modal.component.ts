import { Component, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../product.model';
import { ProductGroup } from '../productGroup.model';
import { TreeOptions } from 'src/app/_modules/tree-module/treeOptions';
import { TreeNode } from 'src/app/_modules/tree-module/models/treeNode';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-product-edit-modal',
    templateUrl: './product-edit-modal.component.html',
    styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {
    @Input() updateProduct = new EventEmitter();
    public selectedTreeNode: TreeNode | null;
    // product: Product;
    productGroup: ProductGroup;
    treeOptions: TreeOptions = {
        fieldNameChildrenArray: "subProductGroups",
        fieldNameId: "id",
        fieldNameLable: "name"
    };
    data: any[] = [
        {
            "id": 1,
            "name": "Test root 2",
            "subProductGroups": [
                {
                    "id": 6,
                    "name": "Test root 5",
                    "subProductGroups": []
                },
                {
                    "id": 7,
                    "name": "Test root 6",
                    "subProductGroups": []
                },
                {
                    "id": 8,
                    "name": "Test root 8",
                    "subProductGroups": []
                },
                {
                    "id": 9,
                    "name": "Test root 9",
                    "subProductGroups": []
                },
                {
                    "id": 10,
                    "name": "Test root 9",
                    "subProductGroups": [
                        {
                            "id": 11,
                            "name": "Test root 10",
                            "subProductGroups": [
                                {
                                    "id": 12,
                                    "name": "Test root 11",
                                    "subProductGroups": [
                                        {
                                            "id": 13,
                                            "name": "Test root 12",
                                            "subProductGroups": [
                                                {
                                                    "id": 14,
                                                    "name": "Test root 13",
                                                    "subProductGroups": []
                                                },
                                                {
                                                    "id": 15,
                                                    "name": "Test root 15",
                                                    "subProductGroups": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 16,
                    "name": "Test root 16",
                    "subProductGroups": [
                        {
                            "id": 17,
                            "name": "Test root 16",
                            "subProductGroups": []
                        },
                        {
                            "id": 18,
                            "name": "Test root 17",
                            "subProductGroups": []
                        },
                        {
                            "id": 19,
                            "name": "Test root 18",
                            "subProductGroups": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "name": "Test root 1",
            "subProductGroups": []
        },
        {
            "id": 3,
            "name": "Test root 3",
            "subProductGroups": []
        },
        {
            "id": 4,
            "name": "Test root 4",
            "subProductGroups": []
        },
        {
            "id": 5,
            "name": "Test root 5",
            "subProductGroups": []
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<ProductEditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product
    ) { }

    ngOnInit(): void {
        if (this.product) {
            this.selectedTreeNode = <TreeNode>{ id: this.product.productGroupId };
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    //   setProductGroup(productGroup: ProductGroup) {
    //     this.productGroup = productGroup;
    //     this.product.productGroupId = productGroup.id;
    //   }

    //   update() {
    //     this.updateProduct.emit(this.product);
    //     this.bsModalRef.hide();
    //   }

    public handleSelection(node: TreeNode): void {
        this.selectedTreeNode = node;
    }
}
