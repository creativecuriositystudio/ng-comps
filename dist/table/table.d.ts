import { EventEmitter } from '@angular/core';
/** A column in the table. */
export interface BaseTableColumn<T> {
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
    reverse?: boolean;
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
    values?: any[] | Promise<any[]> | ((any: any) => any[]) | ((any: any) => Promise<any[]>);
}
/** A column dedicated for an action each row performs */
export interface BaseTableAction<T> {
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
export declare class BaseTableComponent {
    /** Whether the table should have hoverable rows. */
    showHover: boolean;
    /** The empty message displayed when there are no rows. */
    empty: string;
    /** The rows for the table. */
    rows: any[];
    /** Whether the edit mode is activated */
    isEditing: boolean;
    /** The columns for the table. */
    columns: BaseTableColumn<any>[];
    /** The action each columns perform. */
    actions: BaseTableAction<any>[];
    /** Whether the checkbox action should be performed */
    checkboxAction: (_: any) => Promise<void>;
    /** Emits event when a table row is selected. */
    select: EventEmitter<any>;
    /** Emits when a table header is clicked */
    sortHeader: EventEmitter<string>;
    /** On row checkbox update, emit an event to the outer component */
    rowCheckboxChange: EventEmitter<any>;
    /** On row select-lsit update, emit an event to the outer component */
    rowSelectListChange: EventEmitter<any>;
    /** Whether the list has been bulk selected */
    selected: boolean;
    /** Listen to table row selections. */
    onSelect(row: any): void;
    /** Listen to when a header column is clicked */
    onHeaderSelect(field: string): void;
    /** Check whether a given value is an array */
    valueIsArray(value: any): boolean;
    /** Update the checkbox and emits an event to the parent component */
    updateRowCheckbox(row: any): Promise<void>;
    /** Update the select-list and emits an event to the parent component */
    updateSelectList(row: any): Promise<void>;
    /** Mark every row as selected */
    selectAll(): void;
    /** Processes the input values */
    processInputValues(values: any[] | ((any: any) => any[]), row: any): any[];
}
