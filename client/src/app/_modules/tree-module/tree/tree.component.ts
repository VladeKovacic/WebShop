import { CdkConnectedOverlay, ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeOptions } from '../treeOptions';
import { HelloComponent } from '../hello.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() options: TreeOptions;
  @Input() originalData: any[];
  @Input() data: any[] = [];
  @Input() selectedNode: any | null;
  @Output() select$: EventEmitter<any>;
  @ViewChild(CdkConnectedOverlay, { static: true }) private connectedOverlay: CdkConnectedOverlay;
  @ViewChild("filterTextInput") private filterTextInput: ElementRef;
  filterText: string;
  overlayRef: OverlayRef;
  treePosition: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    }
  ];
  isOpen$ = new EventEmitter<boolean>(false);

  constructor(private overlay: Overlay) {
    this.selectedNode = null;
    this.select$ = new EventEmitter();
  }

  ngOnInit(): void {
    this.originalData = JSON.parse(JSON.stringify(this.data));
    this.connectedOverlay.backdropClick.subscribe(event => {
      this.isOpen$.next(false);
    });
  }

  open() {
    this.overlayRef = this.overlay.create();
    const componentPortal = new ComponentPortal(HelloComponent);
    this.overlayRef.addPanelClass("example-overlay");
    this.overlayRef.attach(componentPortal);
  }

  clearFilter() {
    console.log(this.connectedOverlay);
    this.filterText = "";
    this.filter("");
  }

  expand(expand: boolean) {
    this.setExpandFlagNodes(this.data, expand);
  }

  filter(text: string) {
    if (text.length === 0) {
      this.data = JSON.parse(JSON.stringify(this.originalData));
      this.expand(false);
    } else {
      this.data = this.filterNodes(JSON.parse(JSON.stringify(this.originalData)), text);
      this.expand(true);
    }
  }

  handleSelection(event) {
    this.select$.emit(event); 
    this.isOpen$.next(false);
  }

  private setExpandFlagNodes(array: any[], expand: boolean) {
    array.forEach(element => {
      element.expand = expand;
      if (element[this.options.fieldNameChildrenArray] && element[this.options.fieldNameChildrenArray].length > 0) {
        this.setExpandFlagNodes(element[this.options.fieldNameChildrenArray], expand);
      }
    });
  }

  private filterNodes(array: any[], text: string): any[] {
    var result: any[] = [];
    array.forEach(element => {
      if (element[this.options.fieldNameChildrenArray] && element[this.options.fieldNameChildrenArray].length > 0) {
        element[this.options.fieldNameChildrenArray] = this.filterNodes(element[this.options.fieldNameChildrenArray], text);
        if (element[this.options.fieldNameChildrenArray].length > 0 || element[this.options.fieldNameLable].toLowerCase().includes(text.toLowerCase())) {
          result.push(element);
        }
      }
      else if (element[this.options.fieldNameLable].toLowerCase().includes(text.toLowerCase())) {
        result.push(element);
      }
    });
    return result;
  }
}
