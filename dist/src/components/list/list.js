"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const pagination_1 = require("../../helpers/pagination");
const _ = require("lodash");
/**
 * Provides the base functionality and layout for a list screen.
 */
class BaseListComponent {
    constructor() {
        /** The list actions. */
        this.actions = [];
        /** The columns to display. */
        this.columns = [];
        /** The actions to provide for each row. */
        this.rowActions = [];
        /** Whether the search filter needs to be shown for a list view */
        this.showFilter = true;
        /** Whether the pagiantion section needs to be shown */
        this.showPagination = true;
        /** Emits when user chooses the number of items to display per page */
        this.onRefresh = new core_1.EventEmitter();
        /** Emits when a user selects a different page */
        this.onPageChange = new core_1.EventEmitter();
        /** Emits when a user types in the search box */
        this.onSearch = new core_1.EventEmitter();
        /** Emits events when a list item is selected. */
        this.select = new core_1.EventEmitter();
        /** Emits when a table header is clicked */
        this.sortHeader = new core_1.EventEmitter();
        /** On row checkbox update, emit an event to the outer component */
        this.rowCheckboxChange = new core_1.EventEmitter();
        /** The number of pages to display. */
        this.numPages = 1;
        /** The possible row per page amounts. */
        this.rowsPerPage = _.range(10, 50, 10).concat(_.range(50, 101, 25));
        /** The current page navigated to. */
        this.currentPage = 1;
        /** Whether advanced search filters are being entered. */
        this.isFiltering = false;
        /** The observable version of the search */
        this.searchTerm$ = new rxjs_1.Subject();
    }
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
            const pagination = this.data.pagination;
            const itemsPerPage = pagination_1.PaginationHelper.getItemsPerPage();
            this.itemsPerPage = itemsPerPage ? itemsPerPage : 100;
            if (pagination) {
                this.numPages = pagination.numPages;
            }
        }
    }
    /** A list of page numbers to display. */
    get pages() {
        return _.range(1, 1 + this.numPages);
    }
    /**
       * Refresh the page when a user selects how many items to view per page
       * @param num  Number of items displayed per page
       */
    refresh(num) {
        const itemsPerPage = pagination_1.PaginationHelper.getItemsPerPage();
        this.itemsPerPage = itemsPerPage ? itemsPerPage : num;
        pagination_1.PaginationHelper.setItemsPerPage(num);
        this.currentPage = 1;
        const response = {
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
            const response = {
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
        if (_.subtract(this.currentPage, 1) > 0) {
            this.currentPage--;
            const response = {
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
    selectPage(num) {
        this.currentPage = num;
        const response = {
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            searchText: this.searchText,
            sortedField: this.sortedField
        };
        this.onPageChange.emit(response);
        this.initList();
    }
    /** Listen to selections of a list item. */
    onSelect(item) {
        this.select.emit(item);
    }
    /** Update the checkbox and emits an event to the parent component */
    updateRowCheckbox(event) {
        this.rowCheckboxChange.emit(event);
    }
    /** Listen to the header click */
    onHeaderSelect(field) {
        this.sortedField = field;
        const response = {
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            searchText: this.searchTerm$,
            sortedField: this.sortedField
        };
        this.sortHeader.emit(response);
    }
    /** Get the current state of the table */
    get tableState() {
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
    search(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.searchText = value;
            this.searchTerm$.next(value);
            const response = {
                itemsPerPage: this.itemsPerPage,
                currentPage: this.currentPage,
                searchText: this.searchTerm$,
                sortedField: this.sortedField
            };
            this.onSearch.emit(response);
        });
    }
}
BaseListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-list',
                templateUrl: 'list.html',
                styleUrls: ['list.scss']
            },] },
];
/** @nocollapse */
BaseListComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "searchPlaceholder": [{ type: core_1.Input },],
    "model": [{ type: core_1.Input },],
    "data": [{ type: core_1.Input },],
    "searchAttr": [{ type: core_1.Input },],
    "actions": [{ type: core_1.Input },],
    "columns": [{ type: core_1.Input },],
    "rowActions": [{ type: core_1.Input },],
    "addPath": [{ type: core_1.Input },],
    "importPath": [{ type: core_1.Input },],
    "showFilter": [{ type: core_1.Input },],
    "showPagination": [{ type: core_1.Input },],
    "addLabel": [{ type: core_1.Input },],
    "doSearch": [{ type: core_1.Input },],
    "doFilterByBreakdown": [{ type: core_1.Input },],
    "multiActions": [{ type: core_1.Input },],
    "selectedAction": [{ type: core_1.Input },],
    "onRefresh": [{ type: core_1.Output },],
    "onPageChange": [{ type: core_1.Output },],
    "onSearch": [{ type: core_1.Output },],
    "select": [{ type: core_1.Output },],
    "sortHeader": [{ type: core_1.Output },],
    "rowCheckboxChange": [{ type: core_1.Output },],
};
exports.BaseListComponent = BaseListComponent;
//# sourceMappingURL=list.js.map