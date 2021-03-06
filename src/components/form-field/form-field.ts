import * as _ from 'lodash';
import * as validator from 'validator';

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PercentPipe } from '@angular/common';
import { DefaultListGroup } from '../multi-select/multi-select';

export interface FormFieldMap {
  label?: string | ((val: any) => string);
  value?: string | ((val: any) => any);
}

const TypeCheckers = [
  { type: 'required', error: 'Field can\'t be empty', validate: (value: any) => _.isString(value) ? !!value : !_.isNil(value) },
  { type: 'number', error: 'Field is not a number', validate: (value: any) => _.isNumber(value) },
  { type: 'percent', error: 'Field is not a valid percentage', validate: (value: any) => _.isNumber(value) },
  { type: 'integer', error: 'Field is not an integer', validate: (value: any) => _.isInteger(value) },
  { type: 'email', error: 'Field is not a valid email', validate: (value: any) => validator.isEmail(value) },
];

/**
 * Provides the base functionality and layout of a field on a form.
 */
@Component({
  selector: 'arvo-form-field',
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldComponent),
    multi: true
  }],
})
export class FormFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
  /** Emits the value of the selected item on user select */
  @Output() onSelect?: EventEmitter<any> = new EventEmitter();

  /** Emit an event when the multi-select search is complete */
  @Output() onSearchComplete: EventEmitter<any[]> = new EventEmitter();

  /** The typeahead query to get the result items by string */
  @Input() typeAhead: (text: string) => Promise<any[]>;

  /** Flag indicating whether the field is still being loading (for select boxes) */
  isLoading: boolean;

  /** The inner value of the component. */
  protected innerValue: any;

  /** The converted value */
  protected convertedValue: any;

  /** Whether newly written value (from parent) has been retrieved by the input */
  protected isValueRetrieved = true;

  /** The type of the field */
  @Input() type: string;

  /** The name of the field */
  @Input() name: string;

  /** The label of the field */
  @Input() label: string;

  /** The placeholder of the field */
  @Input() placeholder: string;

  /** A prefix to the field */
  @Input() prefix?: string;

  /** An affix to the field */
  @Input() affix?: string;

  /** Flag indicating whether the field is required. */
  @Input() isRequired: boolean;

  /** Flag indicating whether the field is read-only. */
  @Input() isReadOnly: boolean;

  /** Flag indicating whether the input field should be wide. */
  @Input() isWide: boolean;

  /** Whether auto-validate should turn on */
  @Input() autoValidate: boolean;

  /** The option values for a select box, if required */
  @Input() values?: any[] | Promise<any[]>;

  /** The label and value map for select values, if required */
  @Input() valuesMap?: FormFieldMap = {};

  /** The error message to display, if any */
  @Input() errors?: { message: string }[];

  /** Validate the value with the regex field */
  @Input() regex?: string;

  /** The number of columns to display the mulit-select default list */
  @Input() column: number;

  /** Whether this is a single select search */
  @Input() isSingleSelect: boolean;

  /** Hide  the selected items for multi-select */
  @Input() hideSelectedItems: boolean;

  /** Whether the search result list should be hidden for multi-select */
  @Input() hideSearchResult: boolean;

  /** Whether there is a default list */
  @Input() hasDefaultList: boolean;

  /** Show ungrouped list provided by outer component */
  @Input() showUngroupedList: boolean;

  /** The text to display on the header of the default list */
  @Input() defaultListText: string;

  /** The groups to show in the default list with group items */
  @Input() defaultListGroups: DefaultListGroup<any>[];

  /** The list items that don't belong to any groups to show by default */
  @Input() defaultListItems: any[];

  /** Whether the values list contains fontawesome icon codes */
  @Input() valuesAreIcons?: boolean;

  /** The output type of the value */
  @Input() outputType?: 'string' | 'true';

  /** The label map for determining how to display a given item */
  @Input() labelMap: string | ((val: any) => string) = i => i.toString();

  /** The label map for determining how to display a given item */
  @Input() valueMap: string | ((val: any) => any) = i => i;

  /** The touched callback. */
  protected onTouchedCallback: any = () => { /* don't do anything */ };

  /** The value changed callback. */
  protected onChangeCallback: any = () => { /* don't do anything */ };

  /** Get the input value. */
  get value(): any {
    this.isValueRetrieved = true;
    return this.innerValue;
  }

  /** Set the inner value, and emit the formatted value as the model value */
  set value(val: any) {
    if (!this.isValueRetrieved) return;

    // Save new value to inner value
    this.innerValue = val;

    // Convert the inner value to the model format before emitting
    let convertedValue = val;
    switch (this.type) {
      case 'percent': convertedValue = this.fromPercent(val); break;
      case 'cents': convertedValue = this.toCents(val); break;
      case 'number': convertedValue = val && validator.isFloat(val) ? Number(val) : val; break;
      case 'integer': convertedValue = val && validator.isNumeric(val) ? Number(val) : val; break;
    }

    // Emit model value if it's not the same as before
    if (convertedValue !== this.convertedValue) {
      this.convertedValue = convertedValue;
      this.onChangeCallback(this.convertedValue);
    }
  }

  /** Format the incoming model value */
  writeValue(val: any) {
    this.convertedValue = val;

    switch (this.type) {
      case 'percent': val = this.toPercent(val); break;
    }

    this.innerValue = val;
    this.isValueRetrieved = false;
  }

  /** Prepare values */
  ngOnInit() {
    this.prepareValues();
  }

  /** Prepare values */
  ngOnChanges() {
    this.prepareValues();
  }

  /** If the values are still loading, indicate to the user and show them the values once ready */
  protected prepareValues() {
    this.isLoading = this.values && this.values instanceof Promise;
    if (this.isLoading) {
      (this.values as Promise<any[]>).then(i => {
        this.values = i;
        this.isLoading = false;
      });
    }
  }

  /** when the component is blurred. */
  onBlur() {
    this.onTouchedCallback();
  }

  /** Validate the input field */
  validate() {
    if (!this.autoValidate) return;
    setTimeout(() => {
      this.errors = [];

      let fieldExists: boolean;
      if (this.isRequired) {
        const requireCheck = TypeCheckers.find(i => i.type === 'required');
        fieldExists = requireCheck.validate(this.convertedValue);
        if (!fieldExists) this.errors.push({ message: requireCheck.error });
      }

      const typeCheck = TypeCheckers.find(i => i.type === this.type);
      if ((fieldExists || this.convertedValue) && typeCheck) {
        if (!typeCheck.validate(this.convertedValue)) this.errors.push({ message: typeCheck.error });
      }
    }, 200);
  }

  /** Register a change callback. */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  /** Register a touched callback. */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /** Update the select value for two-way binding and emits the name of the select input */
  updateSelect(event: any) {
    this.value = event;
    this.onSelect.emit({ value: this.convertedValue, name: this.name });
  }

  /** Update the select value and emit the name of the input */
  updateFile(event: any) {
    this.onSelect.emit(event.srcElement.files);
  }

  /** Convert from backend percent format to human format */
  toPercent(value: number): string {
    return Number(value) && !isNaN(Number(value)) ? new PercentPipe('en').transform(Number(value), '1.0-5').slice(0, -1) : '';
  }

  /** Convert from human percent format to backend format */
  fromPercent(str: string): number {
    return String(str).match(/-?\d+(\.\d+)?%?/) ? +String(str).replace(/[^\d.-]/g, '') / 100 : 0;
  }

  /** Converts from cents */
  // FIXME make this generic
  fromCents(cents: number): string {
    return cents ? (cents / 100).toString() : '';
  }

  /** Converts to cents */
  toCents(value: string): number {
    if (!value.match(/\$?([\d,]*[\d])(\.\d\d*)?/)) return 0;

    let [dollars, cents] = value.replace(/[^\d.]/g, '').split('.');

    return +dollars * 100 + (!cents || cents.length === 0 ? 0 : cents.length === 1 ? +cents * 10 : +cents.slice(0, 2));
  }

  /** Map the value of each a select item to an object value */
  mapValue(val: any, map: string | ((val: any) => any), defaultValue?: any) {
    let value = typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' ? val :
      (typeof map === 'function' ? map : _.property(map))(val);

    return _.isNil(value) ? defaultValue : value;
  }
}
