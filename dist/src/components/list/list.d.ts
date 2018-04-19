import { OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Model, ModelConstructor } from 'modelsafe';
import { BaseTableColumn, BaseTableAction, SortField } from '../table/table';
/** Helper interface for data emitted to the outter component on page change */
export interface ChangeResponse {
    searchText: string | Subject<string>;
    itemsPerPage: number;
    currentPage: number;
    sortedField?: SortField;
}
/** Helper interface to implement the macro breakdown filter UI */
export interface BreakdownFilterMeta {
    title: string;
    model: string;
    lower?: number;
    upper?: number;
    selectOptions?: string[];
    selected?: string;
}
/** Helper interface allowing the data to be filtered based on macro breakdown values */
export interface HasMacroBreakdown {
    fatPercent: number;
    carbsPercent: number;
    proteinPercent: number;
    totalCalories: number;
    servingSize: number;
}
/** Helper interface for value emitted to outter component when a new page number is selected */
export interface SelectPage {
    currentPage: number;
    itemsPerPage: number;
}
/** Helper interface for parent component that wants to set the select actions for the list table */
export interface SelectAction {
    title: string;
    action(_?: any): any;
}
/** Action to perform for the whole list */
export interface BaseAction {
    /** The label of the action, in HTML. */
    label: string;
    /** Any extra classes for the button */
    class?: string;
    /** Action to be performed when clicked */
    do(event: any): any;
}
/**
 * Provides the base functionality and layout for a list screen.
 */
export declare class BaseListComponent implements OnInit, OnChanges {
    /** The title of the list screen. */
    title: string;
    /** Search placeholder */
    searchPlaceholder: string;
    /** The model displayed in the list. */
    model: ModelConstructor<any>;
    /** The model instance data. */
    data: any[];
    /** Specific fields to be used for text search */
    searchAttr: string;
    /** The list actions. */
    actions: BaseAction[];
    /** The columns to display. */
    columns: BaseTableColumn<Model>[];
    /** The actions to provide for each row. */
    rowActions: BaseTableAction<any>[];
    /** The path segments for the add button. */
    addPath: string | any[];
    /** The path segments for the import button. */
    importPath: string | any[];
    /** Whether the search filter needs to be shown for a list view */
    showFilter: boolean;
    /** Whether the pagiantion section needs to be shown */
    showPagination: boolean;
    /** the label of the add button */
    addLabel: string;
    /** Perform search by the outter component */
    doSearch: (model: ModelConstructor<Model>, text: string, count: number) => Promise<(Model & HasMacroBreakdown)[]>;
    /** Perform search filtering based on the breakdown filter meta data */
    doFilterByBreakdown: (filter: BreakdownFilterMeta[]) => Promise<(Model & HasMacroBreakdown)[]>;
    /** Edit action on the list --- will have archive and so on in the future */
    multiActions: SelectAction[];
    /** The action selected after items are highlighted */
    selectedAction: SelectAction;
    /** Emits when user chooses the number of items to display per page */
    onRefresh: EventEmitter<ChangeResponse>;
    /** Emits when a user selects a different page */
    onPageChange: EventEmitter<ChangeResponse>;
    /** Emits when a user types in the search box */
    onSearch: EventEmitter<ChangeResponse>;
    /** Emits events when a list item is selected. */
    select: EventEmitter<Model>;
    /** Emits when a table header is clicked */
    sortHeader: EventEmitter<ChangeResponse>;
    /** On row checkbox update, emit an event to the outer component */
    rowCheckboxChange: EventEmitter<any>;
    /** Callback for receiving the data items when the list changes */
    onChangeCallback: (_: any[]) => void;
    /** Callback for receiving the data items when the list changes */
    onTouchCallback: () => void;
    /** The number of pages to display. */
    numPages: number;
    /** The possible row per page amounts. */
    rowsPerPage: number[];
    /** The selected number of rows per page to display */
    itemsPerPage: number;
    /** The current page navigated to. */
    currentPage: number;
    /** Whether advanced search filters are being entered. */
    isFiltering: boolean;
    /** The observable version of the search */
    searchTerm$: Subject<string>;
    /** The text to filter the name of an item or items on the list */
    searchText: string;
    /** The field being sorted */
    sortedField: SortField;
    /** Update display items */
    ngOnInit(): void;
    /** Update display items */
    ngOnChanges(): void;
    /** Update display items */
    initList(): void;
    /** A list of page numbers to display. */
    readonly pages: number[];
    /**
     * Refresh the page when a user selects how many items to view per page
     * @param num  Number of items displayed per page
     */
    refresh(num: number): void;
    /** Navigate one page forward in the list */
    nextPage(): void;
    /** Navigate one page back in the list */
    prevPage(): void;
    /** Select the page number to navigate to */
    selectPage(num: number): void;
    /** Listen to selections of a list item. */
    onSelect(item: Model): void;
    /** Update the checkbox and emits an event to the parent component */
    updateRowCheckbox(event: any): void;
    /** Listen to the header click */
    onHeaderSelect(field: SortField): void;
    /** Get the current state of the table */
    readonly tableState: ChangeResponse;
    /** Toggle whether advanced filters are shown. */
    toggleFiltering(): void;
    /** Emits a search string as an observable subject to the parent component */
    search(value: string): Promise<void>;
}
