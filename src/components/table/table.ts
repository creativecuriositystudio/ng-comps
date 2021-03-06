import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormFieldMap } from '../form-field/form-field';
import * as _ from 'lodash';

/** A column in the table. */
export interface TableColumn<T> {
  /** The label. */
  label: string;

  /** The field name */
  field?: SortField;

  /** Input */
  input?: ColumnInput;

  /** Any extra classes for the column container. */
  class?(instance: T): string;

  /** The text format function for the column. This should format the column for display. */
  text?(instance?: T): any;

  /** The HTML format function for the column. This should format the column for display in structured HTML. */
  html?(instance: T): string;

  /** Router link */
  routerLink?(instance: T): string;
}

/** A table header that can be sorted */
export interface SortField {
  name: string;
  type?: string;
  reverse?: boolean;
  placeholder?: string;
  values?: any[] | Promise<any[]>;
  valuesMap?: FormFieldMap;
}

/** An input box on a table column */
export interface ColumnInput {
  /** Type of the input box */
  type?: string;

  /** Placeholder if any */
  placeholder?: string;

  /** Model for two-way data binding */
  model: string;

  /** Values for the select-list if any */
  values?: any[] | Promise<any[]> | ((data: any) => (any[] | Promise<any[]>));
}

/** A column dedicated for an action each row performs */
export interface TableAction<T> {
  /** The label of the action. */
  label: string;

  /** Whether the label is an icon font */
  isIconFont?: boolean;

  /** Any extra classes for the column container. */
  class?(instance: T): string;

  /** Action to be performed when clicked on the column */
  do(event: any, instance?: T): any;

  /** Condition for the action to be hidden */
  isHidden?(instance: T): boolean;
}

/**
 * Provides the base functionality and layout for a generic table.
 */
@Component({
  selector: 'arvo-table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class TableComponent {
  /** Whether the table should have hoverable rows. */
  @Input() showHover = false;

  /** The empty message displayed when there are no rows. */
  @Input() empty = 'No rows available.';

  /** The rows for the table. */
  @Input() rows: any[];

  /** Whether the edit mode is activated */
  @Input() isEditing: boolean;

  /** The columns for the table. */
  @Input() columns: TableColumn<any>[] = [];

  /** The action each columns perform. */
  @Input() actions: TableAction<any>[] = [];

  /** Whether the checkbox action should be performed */
  @Input() checkboxAction: (_: any) => Promise<void>;

  /** Emits event when a table row is selected. */
  @Output() select: EventEmitter<any> = new EventEmitter();

  /** Emits when a table header is clicked */
  @Output() sortHeader: EventEmitter<SortField> = new EventEmitter();

  /** On row checkbox update, emit an event to the outer component */
  @Output() rowCheckboxChange: EventEmitter<any> = new EventEmitter();

  /** On row select-lsit update, emit an event to the outer component */
  @Output() rowSelectListChange: EventEmitter<any> = new EventEmitter();

  /** Whether the list has been bulk selected */
  selected: boolean;

  /** Listen to table row selections. */
  onSelect(row: any) {
    this.select.emit(row);
  }

  /** Listen to when a header column is clicked */
  onHeaderSelect(field: SortField) {
    this.sortHeader.emit(field);
    field.reverse = !field.reverse;
  }

  /** Check whether a given value is an array */
  valueIsArray(value: any) {
    return _.isArray(value);
  }

  /** Update the checkbox and emits an event to the parent component */
  async updateRowCheckbox(row: any) {
    row.checked = !row.checked;
    this.rowCheckboxChange.emit(row);
  }

  /** Update the select-list and emits an event to the parent component */
  async updateSelectList(row: any) {
    row.selected = !row.selected;
    this.rowSelectListChange.emit(row);
  }

  /** Mark every row as selected */
  selectAll() {
    this.selected = !this.selected;
    this.rows.filter(i => i.selected = this.selected);
  }

  /** Processes the input values */
  processInputValues(values: any[] | ((data: any) => any[]), row: any): any[] {
    return typeof values === 'function' ? values(row) : values;
  }
}
