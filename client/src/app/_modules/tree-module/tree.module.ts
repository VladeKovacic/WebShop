import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule { }
