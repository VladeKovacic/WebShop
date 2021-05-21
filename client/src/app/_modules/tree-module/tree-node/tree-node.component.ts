import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../models/treeNode';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {
  @Input() parentId: number;
  @Input() data: TreeNode[];
  @Input() node: TreeNode | null;
  @Input() selectedNode: TreeNode | null;
  @Output() select: EventEmitter<TreeNode>;

  constructor() {
    this.node = null;
    this.selectedNode = null;
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
  }

  removeCurrentLevelItems(data, parentId) {
    return data.filter(item => item.parentId !== parentId)
  }

  hasChildren(parentId: number) {
    return this.data.filter(item => item.parentId === parentId).length > 0;
  }
}
