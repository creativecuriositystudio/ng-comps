import { OnInit } from '@angular/core';
import { ModelConstructor } from 'modelsafe';
import { BaseModel } from '../../../models';
import { Location } from '@angular/common';
/** A panel in the read page */
export interface BasePanel<T> {
    /** Label of the read panel */
    label: string;
    /** Fields to display */
    fields: BaseReadField<T>[];
    /** Conditional display statement */
    showIf?(instance?: T): any;
}
/** An info panel on the read page */
export interface ReadInfoPanel {
    /** Message in the panel */
    message: string;
    /** Theme of the panel */
    theme?: 'warning' | 'success' | 'info';
}
/** An action to perform on the read page data */
export interface ReadAction {
    /** Label of the read action */
    label: string;
    /** The css class to apply */
    class: string;
    /** Action to perform */
    do(): void;
}
/** A column in the table. */
export interface BaseReadField<T> {
    /** The label. */
    label: string;
    /** The key name to be passed for two-way binding */
    model?: string;
    /** Show the field if a condition of the data is valid */
    showIf?(instance?: T): any;
    /** Any extra classes for the column container. */
    class?(instance: T): string;
    /** The text format function for the column. This should format the column for display. */
    text?(instance?: T): any;
    /** The HTML format function for the column. This should format the column for display in structured HTML. */
    html?(instance: T): string;
}
/**
 * Provides the base functionality and layout for a read screen.
 */
export declare class BaseReadComponent implements OnInit {
    private location;
    /** The title of the read screen. */
    title: string;
    /** The panels to display. */
    panels: BaseReadField<BaseModel>[];
    /** The model displayed in the list. */
    model: ModelConstructor<BaseModel>;
    /** The model instance data. */
    data: BaseModel[];
    /** Label of the edit button */
    editLabel: string;
    /** If the edit button needs to be hidden */
    readOnly: boolean;
    /** List of info panels to display on top of the page */
    infoPanels: ReadInfoPanel[];
    /** Extra buttons if needed */
    extraActions: ReadAction[];
    /** Constructs this component */
    constructor(location: Location);
    /** Initializes this component */
    ngOnInit(): void;
    /** Returns to the previous page */
    back(): void;
}
