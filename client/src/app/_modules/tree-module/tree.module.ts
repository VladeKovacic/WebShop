import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';



@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule { }
