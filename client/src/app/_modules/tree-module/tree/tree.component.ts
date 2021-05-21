import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../models/treeNode';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() parentId: number;
  @Input() data: TreeNode[];
  @Input() selectedNode: TreeNode | null;
  @Output() select: EventEmitter<TreeNode>;

  constructor() {
    this.selectedNode = null;
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
