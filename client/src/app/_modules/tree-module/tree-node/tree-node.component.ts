import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeOptions } from '../treeOptions';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {
  @Input() options: TreeOptions;
  @Input() data: any[];
  @Input() node: any | null;
  @Input() selectedNode: any | null;
  @Output() select: EventEmitter<any>;

  constructor() {
    this.node = null;
    this.selectedNode = null;
    this.select = new EventEmitter();
  }

  ngOnInit(): void {
  }
}
