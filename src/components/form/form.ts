import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ModelConstructor } from 'modelsafe';

import { DefaultListGroup } from '../multi-select/multi-select';
import * as _ from 'lodash';

/** A panel in the form page */
export interface FormPanel<T> {
  /** Label of the panel */
  label: string;

  /** List of form fields within a panel */
  fields: FormField<T>[];

  /** Whether the panel is hidden */
  hidden?: boolean;
}

/** A column in the table. */
export interface FormField<T> {
  /** The label. */
  label?: string;

  /** Flag to insert a separator */
  separator?: boolean;

  /** The key name to be passed for two-way binding */
  model?: string;

  /** The display input type */
  type?: string;

  /** Whether the field is read-only */
  readOnly?: boolean;

  /** Whether there should be a border around a readonly input field */
  border?: boolean;

  /** The values to be mapped by the mapper */
  values?: any;

  /** Value mapper object */
  valuesMap?: any;

  /** Whether the field is required */
  isRequired?: boolean;

  /** Whether the form field is hidden */
  hidden?: boolean;

  /** The placeholder of the form field */
  placeholder?: string;

  /** Whether the field should be displayed as a full row width */
  isWide?: boolean;

  /** Type of the output */
  outputType?: 'string' | 'true';

  /** START MULTI-SELECT COMPONENT FIELDS */

  /** Hide  the selected items */
  hideSelectedItems?: boolean;

  /** Whether the search result list should be hidden */
  hideSearchResult?: boolean;

  /** Whether there is a default list ON FOCUS */
  hasDefaultList?: boolean;

  /** The number of columns to display default group list */
  column?: number;

  /** Show ungrouped list */
  showUngroupedList?: boolean;

  /** The text to display on the header of the default list */
  defaultListText?: string;

  /** The groups to show in the default list with group items */
  defaultListGroups?: DefaultListGroup<any>[];

  /** The list items that don't belong to any groups to show by default */
  defaultListItems?: T[];

  /** The label map for determining how to display a given item */
  labelMap?: string | ((val: any) => string);

  /** The VALUE map for determining how to return the value of a given item */
  valueMap?: string | ((val: any) => any);

  /** END MULIT-SELECT COMPONENT FIELDS */

  /** Show the field if a condition of the data is valid */
  showIf?(instance?: T): any;

  /** Any extra classes for the column container. */
  class?(instance: T): string;

  /** The text format function for the column. This should format the column for display. */
  text?(instance?: T): any;

  /** The HTML format function for the column. This should format the column for display in structured HTML. */
  html?(instance: T): string;

  /** Hook called when value is selected */
  onSelect?(value: any): void;

  /** The typeahead search query to get the result items by string */
  typeAhead?(text: string): Promise<T[]>;
}

export interface ConstraintError {
  field: string;
  message: string[];
}

/**
 * Provides the base functionality and layout for a form screen.
 */
@Component({
  selector: 'arvo-form',
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class FormComponent implements OnInit {
  /** The title of the read screen. */
  @Input() title: string;

  /** The panels to display. */
  @Input() panels: FormPanel<any>[];

  /** The model displayed in the form. */
  @Input() model: ModelConstructor<any>;

  /** The model instance data. */
  @Input() data: any;

  /** Overwriting id field */
  @Input() saveByPath: string;

  /** Overriding re-direct field */
  @Input() redirectByPath: string;

  /** The mode of the form page */
  @Input() mode: 'edit' | 'create';

  /** Field on a model to be hidden */
  @Input() hiddenFields: string[];

  /** Name of the panels to be hidden */
  @Input() hiddenPanels: string[];

  /** Save label */
  @Input() saveLabel: string;

  /** Label for the cancer button */
  @Input() cancelLabel: string;

  /** Overriding class for the save button */
  @Input() saveBtnClass: string;

  /** Hide the save button */
  @Input() hideCancel: boolean;

  /** Hide the save button */
  @Input() hideSave: boolean;

  /** Will prevent the edit call */
  @Input() blockCancel: boolean;

  /** Constraint errors that can't be displayed */
  @Input() constraintErrors: ConstraintError[] = [];

  /** Error message returned from the backend */
  @Input() error: string;

  /** Hook called when value is selected */
  @Output() onSelect?: EventEmitter<any> = new EventEmitter();

  /** Hook called when the form needs to be saved */
  @Output() save: EventEmitter<boolean> = new EventEmitter();

  /** Hook called before cancel */
  @Input() beforeCancel: EventEmitter<boolean> = new EventEmitter();

  /** Whether the form is being saved. */
  isSaving = false;

  /** Constructs this component */
  constructor(private location: Location) {}

  /** Initializes this component */
  ngOnInit() {
    if (this.panels) {
      this.hiddenFields = this.hiddenFields || [];
      this.hiddenPanels = this.hiddenPanels || [];
      this.panels = this.panels.filter(i => !_.includes(this.hiddenPanels, i.label));
      this.panels.forEach(p => p.fields = p.fields.filter(i => !_.includes(this.hiddenFields, i.model)));
    }
  }

  /** Saves the form data */
  async onSave() {
    this.isSaving = true;

    this.save.emit(true);

    this.isSaving = false;
  }

  /**
   * Cancel saving the model data and navigate back.
   */
  async cancel() {
    this.beforeCancel.emit(true);
    if (!this.blockCancel) this.location.back();
  }
}
