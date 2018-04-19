import * as moment from 'moment';
import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DefaultListGroup } from '../multi-select/multi-select';
export interface BaseFormFieldMap {
    label?: string | ((val: any) => string);
    value?: string | ((val: any) => any);
}
/**
 * Provides the base functionality and layout of a field on a form.
 */
export declare class BaseFormFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
    /** Emits the value of the selected item on user select */
    onSelect?: EventEmitter<any>;
    /** Determines what date picker window to select */
    datePickerElement: any;
    /** The typeahead query to get the result items by string */
    typeAhead: (text: string) => Promise<any[]>;
    /** Flag indicating whether the field is still being loading (for select boxes) */
    isLoading: boolean;
    /** The inner value of the component. */
    protected innerValue: any;
    /** The converted value */
    protected convertedValue: any;
    /** Whether newly written value (from parent) has been retrieved by the input */
    protected isValueRetrieved: boolean;
    /** The type of the field */
    type: string;
    /** The name of the field */
    name: string;
    /** The label of the field */
    label: string;
    /** The placeholder of the field */
    placeholder: string;
    /** A prefix to the field */
    prefix?: string;
    /** An affix to the field */
    affix?: string;
    /** Flag indicating whether the field is required. */
    isRequired: boolean;
    /** Flag indicating whether the field is read-only. */
    isReadOnly: boolean;
    /** Flag indicating whether the input field should be wide. */
    isWide: boolean;
    /** The option values for a select box, if required */
    values?: any[] | Promise<any[]>;
    /** The label and value map for select values, if required */
    valuesMap?: BaseFormFieldMap;
    /** The error message to display, if any */
    errors?: {
        message: string;
    }[];
    /** The format the date output type should be */
    dateOutputType?: 'string' | 'date' | 'moment';
    /** Validate the value with the regex field */
    regex?: string;
    /** The number of columns to display the mulit-select default list */
    column: number;
    /** Whether there is a default list */
    hasDefaultList: boolean;
    /** Show ungrouped list provided by outer component */
    showUngroupedList: boolean;
    /** The text to display on the header of the default list */
    defaultListText: string;
    /** The groups to show in the default list with group items */
    defaultListGroups: DefaultListGroup<any>[];
    /** The list items that don't belong to any groups to show by default */
    defaultListItems: any[];
    /** The output type of the value */
    outputType?: 'string' | 'true';
    /** The label map for determining how to display a given item */
    labelMap: string | ((val: any) => string);
    /** The label map for determining how to display a given item */
    valueMap: string | ((val: any) => any);
    /** The touched callback. */
    protected onTouchedCallback: any;
    /** The value changed callback. */
    protected onChangeCallback: any;
    /** Get the input value. */
    /** Set the inner value, and emit the formatted value as the model value */
    value: any;
    /** Format the incoming model value */
    writeValue(val: any): void;
    /** Prepare values */
    ngOnInit(): void;
    /** Prepare values */
    ngOnChanges(): void;
    /** Formats the date output */
    protected formatDateOutput(value: moment.Moment): string | Date | moment.Moment;
    /** If the values are still loading, indicate to the user and show them the values once ready */
    protected prepareValues(): void;
    /** when the component is blurred. */
    onBlur(): void;
    /** Validate the input field */
    validate(): void;
    /** Register a change callback. */
    registerOnChange(fn: any): void;
    /** Register a touched callback. */
    registerOnTouched(fn: any): void;
    /** Update the select value for two-way binding and emits the name of the select input */
    updateSelect(event: any): void;
    /** Update the select value and emit the name of the input */
    updateFile(event: any): void;
    /** Opens the date picker window */
    openCalendar(): void;
    /** Convert from backend percent format to human format */
    toPercent(value: number): string;
    /** Convert from human percent format to backend format */
    fromPercent(str: string): number;
    /** Converts from cents */
    fromCents(cents: number): string;
    /** Converts to cents */
    toCents(value: string): number;
    /** Map the value of each a select item to an object value */
    mapValue(val: any, map: string | ((val: any) => any), defaultValue?: any): any;
}
