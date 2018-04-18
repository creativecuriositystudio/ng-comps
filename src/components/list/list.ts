import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Model, ModelConstructor } from 'modelsafe';
import { PaginationHelper } from '../../helpers/pagination';
import * as _ from 'lodash';

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
@Component({
  selector: 'app-list',
  templateUrl: 'list.html',
  styleUrls: ['list.scss']
})
export class BaseListComponent implements OnInit, OnChanges {
  /** The title of the list screen. */
  @Input() title: string;

  /** Search placeholder */
  @Input() searchPlaceholder: string;

  /** The model displayed in the list. */
  @Input() model: ModelConstructor<any>;

  /** The model instance data. */
  @Input() data: any[];

  /** Specific fields to be used for text search */
  @Input() searchAttr: string;

  /** The list actions. */
  @Input() actions: BaseAction[] = [];

  /** The columns to display. */
  @Input() columns: BaseTableColumn<Model>[] = [];

  /** The actions to provide for each row. */
  @Input() rowActions: BaseTableAction<any>[] = [];

  /** The path segments for the add button. */
  @Input() addPath: string | any[];

  /** The path segments for the import button. */
  @Input() importPath: string | any[];

  /** Whether the search filter needs to be shown for a list view */
  @Input() showFilter = true;

  /** Whether the pagiantion section needs to be shown */
  @Input() showPagination = true;

  /** the label of the add button */
  @Input() addLabel: string;

  /** Perform search by the outter component */
  @Input() doSearch: (model: ModelConstructor<Model>, text: string, count: number) => Promise<(Model & HasMacroBreakdown)[]>;

  /** Perform search filtering based on the breakdown filter meta data */
  @Input() doFilterByBreakdown: (filter: BreakdownFilterMeta[]) => Promise<(Model & HasMacroBreakdown)[]>;

  /** Edit action on the list --- will have archive and so on in the future */
  @Input() multiActions: SelectAction[];

  /** The action selected after items are highlighted */
  @Input() selectedAction: SelectAction;

  /** Emits when user chooses the number of items to display per page */
  @Output() onRefresh: EventEmitter<ChangeResponse> = new EventEmitter();

  /** Emits when a user selects a different page */
  @Output() onPageChange: EventEmitter<ChangeResponse> = new EventEmitter();

  /** Emits when a user types in the search box */
  @Output() onSearch: EventEmitter<ChangeResponse> = new EventEmitter();

  /** Emits events when a list item is selected. */
  @Output() select: EventEmitter<Model> = new EventEmitter();

  /** Emits when a table header is clicked */
  @Output() sortHeader: EventEmitter<ChangeResponse> = new EventEmitter();

  /** On row checkbox update, emit an event to the outer component */
  @Output() rowCheckboxChange: EventEmitter<any> = new EventEmitter();

  /** Callback for receiving the data items when the list changes */
  public onChangeCallback: (_: any[]) => void;

  /** Callback for receiving the data items when the list changes */
  public onTouchCallback: () => void;

  /** The number of pages to display. */
  numPages = 1;

  /** The possible row per page amounts. */
  rowsPerPage = _.range(10, 50, 10).concat(_.range(50, 101, 25));

  /** The selected number of rows per page to display */
  itemsPerPage: number;

  /** The current page navigated to. */
  currentPage = 1;

  /** Whether advanced search filters are being entered. */
  isFiltering = false;

  /** The observable version of the search */
  searchTerm$ = new Subject<string>();

  /** The text to filter the name of an item or items on the list */
  searchText: string;

  /** The field being sorted */
  sortedField: SortField;

  /** Update display items */
  ngOnInit() {
    this.initList();
  }

  /** Update display items */
  ngOnChanges() {
    this.initList();
  }

  /** Update display items */
  initList() {
    if (this.data) {
      const pagination = (this.data as any).pagination;
      const itemsPerPage = PaginationHelper.getItemsPerPage();

      this.itemsPerPage = itemsPerPage ? itemsPerPage : 100;

      if (pagination) {
        this.numPages = pagination.numPages;
      }
    }
  }

  /** A list of page numbers to display. */
  get pages(): number[] {
    return _.range(1, 1 + this.numPages);
  }

  /**
   * Refresh the page when a user selects how many items to view per page
   * @param num  Number of items displayed per page
   */
  refresh(num: number) {
    const itemsPerPage = PaginationHelper.getItemsPerPage();
    this.itemsPerPage = itemsPerPage ? itemsPerPage : num;
    PaginationHelper.setItemsPerPage(num);

    this.currentPage = 1;

    const response: ChangeResponse = {
      itemsPerPage: num,
      currentPage: this.currentPage,
      searchText: this.searchText,
      sortedField: this.sortedField
    };

    this.onRefresh.emit(response);
  }

  /** Navigate one page forward in the list */
  nextPage() {
    if (_.add(this.currentPage, 1) <= this.numPages) {
      this.currentPage++;
      const response: ChangeResponse = {
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        searchText: this.searchText,
        sortedField: this.sortedField
      };

      this.onPageChange.emit(response);
      this.initList();
    }
  }

  /** Navigate one page back in the list */
  prevPage() {
    if (_.subtract(this.currentPage, 1) > 0 ) {
      this.currentPage--;
      const response: ChangeResponse = {
        itemsPerPage: this.itemsPerPage,
        currentPage: this.currentPage,
        searchText: this.searchText,
        sortedField: this.sortedField
      };

      this.onPageChange.emit(response);
      this.initList();
    }
  }

  /** Select the page number to navigate to */
  selectPage(num: number) {
    this.currentPage = num;
    const response: ChangeResponse = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchText,
      sortedField: this.sortedField
    };

    this.onPageChange.emit(response);
    this.initList();
  }

  /** Listen to selections of a list item. */
  onSelect(item: Model) {
    this.select.emit(item);
  }

  /** Update the checkbox and emits an event to the parent component */
  updateRowCheckbox(event: any) {
    this.rowCheckboxChange.emit(event);
  }

  /** Listen to the header click */
  onHeaderSelect(field: SortField) {
    this.sortedField = field;

    const response: ChangeResponse = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchTerm$,
      sortedField: this.sortedField
    };

    this.sortHeader.emit(response);
  }

  /** Get the current state of the table */
  get tableState(): ChangeResponse {
    return {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchTerm$,
      sortedField: this.sortedField
    };
  }

  /** Toggle whether advanced filters are shown. */
  toggleFiltering() {
    this.isFiltering = !this.isFiltering;
  }

  /** Emits a search string as an observable subject to the parent component */
  async search(value: string) {
    this.searchText = value;
    this.searchTerm$.next(value);

    const response: ChangeResponse = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchTerm$,
      sortedField: this.sortedField
    };

    this.onSearch.emit(response);
  }
}
