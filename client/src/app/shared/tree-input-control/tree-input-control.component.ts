import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { ProductGroup } from 'src/app/product/productGroup.model';
import { TreeItem } from 'src/app/_modules/tree-module/treeItem';

@Component({
  selector: 'app-tree-input-control',
  templateUrl: './tree-input-control.component.html',
  styleUrls: ['./tree-input-control.component.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: TreeInputControlComponent }],
})
export class TreeInputControlComponent  implements ControlValueAccessor, MatFormFieldControl<TreeItem>, OnDestroy {
  static nextId = 0;
  @ViewChild('treeItem') treeItem: HTMLInputElement;
  
  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType? = 'app-tree-input-control';
  id = `app-tree-input-control-${TreeInputControlComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};
  get empty() {
    return !this.parts;
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @Input('aria-describedby') userAriaDescribedBy: string;
  
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): TreeItem | null {
    if (this.parts.valid) {
      return this.value;
    }
    return null;
  }
  set value(tel: TreeItem | null) {
    this.value = tel || new TreeItem();
    this.parts.setValue(this.treeItem);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      treeItem: [
        null,
        [Validators.required]
      ]
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  
  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.example-tel-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.treeItem.valid) {
      this._focusMonitor.focusVia(this.treeItem, 'program');
    }
  }

  writeValue(tel: TreeItem | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
