import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ModelConstructor } from 'modelsafe';

import { DefaultListGroup } from '../multi-select/multi-select';
import * as _ from 'lodash';

/** A panel in the form page */
export interface BasePanel<T> {
  /** Label of the panel */
  label: string;

  /** List of form fields within a panel */
  fields: BaseFormField<T>[];

  /** Whether the panel is hidden */
  hidden?: boolean;
}

/** A column in the table. */
export interface BaseFormField<T> {
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
  typeAhead?(text: string): Promise<T[]>
}

/**
 * Provides the base functionality and layout for a form screen.
 */
@Component({
  selector: 'app-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss']
})
export class BaseFormComponent implements OnInit {
  /** The title of the read screen. */
  @Input() title: string;

  /** The panels to display. */
  @Input() panels: BasePanel<any>[];

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

  /** A function to call before saving the data */
  @Input() beforeSave: () => void;

  /** Will prevent the save call being made by rest */
  @Input() blockSave: boolean;

  /** A function to call before cancel the edit */
  @Input() beforeCancel: () => void;

  /** Will prevent the edit call */
  @Input() blockCancel: boolean;

  /** Hook called when value is selected */
  @Output() onSelect?: EventEmitter<any> = new EventEmitter();

  /** Whether the form is being saved. */
  isSaving = false;

  /** An error message returned from the backend. */
  error?: string;

  /** Any field errors returned from the backend. */
  errors: any = {};

  /** Constraint errors that can't be displayed */
  constraintErrors: { field: string; message: string[]; }[] = [];

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
  async save() {
    this.isSaving = true;
    this.constraintErrors = [];

    if (this.beforeSave) await this.beforeSave();

    // FIXME move this into parent
    /*
    try {
      if (!this.blockSave) {
        let task = await this.rest.save(this.model, this.data, { idPath: this.saveByPath || 'id' });
        this.router.navigate(
          [this.data.id ? '../..' : '..', this.redirectByPath ? task[this.redirectByPath] : task.id],
          { relativeTo: this.route }
        );
      }
    } catch (err) {
      if (err.errors) {
        this.errors = (err as RESTError).errors || {};
      }

      // Show the relevant error message
      this.error = this.handleErrorMessage(err);
      if (!this.error) this.error = err.message;
    }
    */

    let constraintErrors = this.errors.$constraints as any;
    if (constraintErrors && _.size(constraintErrors) > 0) {
      _.each(constraintErrors, (value, key) => {
        this.constraintErrors.push({
          field: _.upperCase(key),
          message: value.map((v: any) => _.startCase(v.message))
        });
      });
    }

    this.isSaving = false;
  }

  /** Handles the error message from the backend, returning either a 'pretty print' version or the message */
  handleErrorMessage(error: any) {
    try {
      let errs = [];

      for (let i = 0; i < _.values(error.errors).length; ++i) {
        errs[i] = [
          _.startCase(Object.keys(error.errors)[i]),
          _.values(error.errors)[i].map((e: any) => _.lowerCase(e.message)).join(' and ')
        ].join(' ');
      }
      return errs.join('. ');
    } catch (err) {
      return error.message;
    }
  }

  /**
   * Cancel saving the model data and navigate back.
   */
  async cancel() {
    if (this.beforeCancel) await this.beforeCancel();
    if (!this.blockCancel) this.location.back();
  }
}
