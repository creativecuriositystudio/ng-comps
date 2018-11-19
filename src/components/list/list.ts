import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Model, ModelConstructor } from 'modelsafe';
import { PaginationHelper } from '../../helpers/pagination';
import * as _ from 'lodash';

import { TableColumn, TableAction, SortField } from '../table/table';

/** Helper interface for data emitted to the outter component on page change */
export interface ChangeResponse {
  searchText: string | Subject<string>;
  searchString: string;
  itemsPerPage: number;
  currentPage: number;
  sortedField?: SortField;
  searchQueuries?: SearchQuery[];
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

/** Helper interface for the filter data */
export interface SearchFilter {
  label: string;
  key: string;
}

/** Action to perform for the whole list */
export interface Action {
  /** The label of the action, in HTML. */
  label: string;

  /** Any extra classes for the button */
  class?: string;

  /** Action to be performed when clicked */
  do(event: any): any;
}

/** Search query data type */
export class SearchQuery {
  path?: string;
  field?: SortField;
  operator?: string;
  firstValue?: string;
  secondValue?: string;
} 

/**
 * Provides the base functionality and layout for a list screen.
 */
@Component({
  selector: 'arvo-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent implements OnInit, OnChanges {
  /** The title of the list screen. */
  @Input() title: string;

  /** Search placeholder */
  @Input() searchPlaceholder: string;

  /** The model displayed in the list. */
  @Input() model: ModelConstructor<any>;

  /** The model instance data. */
  @Input() data: any[];

  /** Whether the list screen has search filter */
  @Input() hasSearchFilters: boolean;

  /** Specific fields to be used for text search */
  @Input() searchAttr: string;

  /** The list actions. */
  @Input() actions: Action[] = [];

  /** The columns to display. */
  @Input() columns: TableColumn<Model>[] = [];

  /** The actions to provide for each row. */
  @Input() rowActions: TableAction<any>[] = [];

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
  @Input() doSearch: (model: ModelConstructor<Model>, text: string, count: number) => Promise<Model[]>;

  /** Edit action on the list --- will have archive and so on in the future */
  @Input() multiActions: SelectAction[];

  /** The action selected after items are highlighted */
  @Input() selectedAction: SelectAction;

  /** List of filterable search columns */
  @Input() searchFilters: TableColumn<Model>[] = [];

  /** List of fitler types */
  @Input() filterTypes: SearchFilter[] = [
    { label: 'Equals', key: 'eq' },
    { label: 'Not equals', key: 'ne' },
    { label: 'Contains', key: 'like' },
    { label: 'Not Contains', key: 'notLike' },
    { label: 'Greater than', key: 'gt' },
    { label: 'Greater than or equal', key: 'gte' },
    { label: 'Less than', key: 'lt' },
    { label: 'Less than or equal', key: 'lte' },
    { label: 'Between', key: 'between' }
  ];

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

  /** Emits when a searchQuery is added or removed */
  @Output() searchQueryChange: EventEmitter<any> = new EventEmitter();

  /** Callback for receiving the data items when the list changes */
  public onChangeCallback: (_: any[]) => void;

  /** Callback for receiving the data items when the list changes */
  public onTouchCallback: () => void;

  /** The number of pages to display. */
  numPages = 1;

  /** The number of total items */
  numItems = 0;

  /** The possible row per page amounts. */
  rowsPerPage = _.range(10, 50, 10).concat(_.range(50, 101, 25));

  /** The selected number of rows per page to display */
  itemsPerPage: number;

  /** The current page navigated to. */
  currentPage = 1;

  /** The observable version of the search */
  searchTerm$ = new Subject<string>();

  /** The text to filter the name of an item or items on the list */
  searchText: string;

  /** The field being sorted */
  sortedField: SortField;

  /** List of search queries */
  searchQueries: SearchQuery[] = [];

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
        this.numItems = pagination.numItems;
      }
    }
  }

  /** Add a new search query */
  addSearchQuery() {
    this.searchQueries.push(new SearchQuery());
    this.searchQueryChange.emit(this.searchQueries);
  }

  /** Remove a search query as selected */
  removeSearchQuery(query: SearchQuery) {
    let index = this.searchQueries.indexOf(query);
    if (index > -1) this.searchQueries.splice(index, 1);
    this.searchQueryChange.emit(this.searchQueries);
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
      searchString: this.searchText,
      sortedField: this.sortedField,
      searchQueuries: this.searchQueries
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
        searchString: this.searchText,
        sortedField: this.sortedField,
        searchQueuries: this.searchQueries
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
        searchString: this.searchText,
        sortedField: this.sortedField,
        searchQueuries: this.searchQueries
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
      searchString: this.searchText,
      sortedField: this.sortedField,
      searchQueuries: this.searchQueries
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
      searchString: this.searchText,
      sortedField: this.sortedField,
      searchQueuries: this.searchQueries
    };

    this.sortHeader.emit(response);
  }

  /** Get the current state of the table */
  get tableState(): ChangeResponse {
    return {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchTerm$,
      searchString: this.searchText,
      sortedField: this.sortedField,
      searchQueuries: this.searchQueries
    };
  }

  /** Emits a search string as an observable subject to the parent component */
  async search() {
    this.searchTerm$.next(this.searchText);

    const response: ChangeResponse = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      searchText: this.searchTerm$,
      searchString: this.searchText,
      sortedField: this.sortedField,
      searchQueuries: this.searchQueries
    };

    this.onSearch.emit(response);
  }
}
