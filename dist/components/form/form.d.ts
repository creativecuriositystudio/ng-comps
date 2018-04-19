import { OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ModelConstructor } from 'modelsafe';
import { DefaultListGroup } from '../multi-select/multi-select';
/** A panel in the form page */
export interface BaseFormPanel<T> {
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
    typeAhead?(text: string): Promise<T[]>;
}
/**
 * Provides the base functionality and layout for a form screen.
 */
export declare class BaseFormComponent implements OnInit {
    private location;
    /** The title of the read screen. */
    title: string;
    /** The panels to display. */
    panels: BaseFormPanel<any>[];
    /** The model displayed in the form. */
    model: ModelConstructor<any>;
    /** The model instance data. */
    data: any;
    /** Overwriting id field */
    saveByPath: string;
    /** Overriding re-direct field */
    redirectByPath: string;
    /** The mode of the form page */
    mode: 'edit' | 'create';
    /** Field on a model to be hidden */
    hiddenFields: string[];
    /** Name of the panels to be hidden */
    hiddenPanels: string[];
    /** Save label */
    saveLabel: string;
    /** Label for the cancer button */
    cancelLabel: string;
    /** Overriding class for the save button */
    saveBtnClass: string;
    /** Hide the save button */
    hideCancel: boolean;
    /** Hide the save button */
    hideSave: boolean;
    /** A function to call before saving the data */
    beforeSave: () => void;
    /** Will prevent the save call being made by rest */
    blockSave: boolean;
    /** A function to call before cancel the edit */
    beforeCancel: () => void;
    /** Will prevent the edit call */
    blockCancel: boolean;
    /** Hook called when value is selected */
    onSelect?: EventEmitter<any>;
    /** Whether the form is being saved. */
    isSaving: boolean;
    /** An error message returned from the backend. */
    error?: string;
    /** Any field errors returned from the backend. */
    errors: any;
    /** Constraint errors that can't be displayed */
    constraintErrors: {
        field: string;
        message: string[];
    }[];
    /** Constructs this component */
    constructor(location: Location);
    /** Initializes this component */
    ngOnInit(): void;
    /** Saves the form data */
    save(): Promise<void>;
    /** Handles the error message from the backend, returning either a 'pretty print' version or the message */
    handleErrorMessage(error: any): any;
    /**
     * Cancel saving the model data and navigate back.
     */
    cancel(): Promise<void>;
}
