import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
/** Default list group fields */
export interface DefaultListGroup<T> {
    label: string;
    values: T[];
}
/** Provides a multi-select component */
export declare class MultiSelectComponent<T> implements ControlValueAccessor {
    private elementRef;
    /** The input name */
    name: string;
    /** The input text value */
    text: string;
    /** The observable version of the search */
    searchTerm$: Subject<string>;
    /** List of mapped selected items */
    selectedItems: T[];
    /** List of result items from search */
    resultItems: T[];
    /** Whether the result list should be displayed */
    showResultList: boolean;
    /** Whether the default list should be displayed */
    showDefaultList: boolean;
    /** Default placeholder */
    placeholder: string;
    /** List of original selected items */
    rawSelectedItems: T[];
    /** Callback for receiving the selected items when the list changes */
    onChangeCallback: (_: T[]) => void;
    /** Callback for receiving the selected items when the list changes */
    onTouchCallback: () => void;
    /** The number of columns to display the default list */
    column: number;
    /** Whether there is a default list */
    hasDefaultList: boolean;
    /** Whether the field is readonly */
    isReadOnly: boolean;
    /** Show ungrouped list provided by outer component */
    showUngroupedList: boolean;
    /** The text to display on the header of the default list */
    defaultListText: string;
    /** The groups to show in the default list with group items */
    defaultListGroups: DefaultListGroup<T>[];
    /** The list items that don't belong to any groups to show by default */
    defaultListItems: T[];
    /** The typeahead query to get the result items by string */
    typeAhead: (text: string) => Promise<T[]>;
    /** The label map for determining how to display a given item */
    labelMap: string | ((val: any) => string);
    /** The label map for determining how to display a given item */
    valueMap: string | ((val: any) => any);
    /** Construct this component */
    constructor(elementRef: ElementRef);
    /** Register a change callback. */
    registerOnChange(fn: any): void;
    /** Ignore onTouched */
    registerOnTouched(fn: any): void;
    /** Write value to the selected items */
    writeValue(value: T[]): void;
    /**
     * Add an item to the select list and emit the list of selected items
     *
     * @param event  Ngb event containing selected item
     * @param input  HTML Input element
     */
    add(item: T, input: any): void;
    /**
     * Remove an item from the selected list
     *
     * @param item  An item to be removed
     */
    remove(item: T): Promise<void>;
    /** Clear all selected items */
    clear(): Promise<void>;
    /** Listening to clicks outside of the component and close lists */
    clickout(event: MouseEvent): void;
    /** Close the result list and the default list on clicks outside of the component */
    closeLists(): void;
    /** Show the default list if enabled on input focus */
    onFocus(): void;
    /** Emits an event to the parent component with the searched value */
    search(value: string): void;
    /** Map the value of each a select item to an object value */
    mapValue(val: any, map: string | ((val: any) => any), defaultValue?: any): any;
}
