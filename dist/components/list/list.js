"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let BaseListComponent = class BaseListComponent {
    /**
     * Provides the base functionality and layout for a list screen.
     */
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
};
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "title", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "searchPlaceholder", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "model", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "data", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "searchAttr", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "actions", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "columns", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "rowActions", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "addPath", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "importPath", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "showFilter", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "showPagination", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "addLabel", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "doSearch", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "doFilterByBreakdown", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "multiActions", void 0);
__decorate([
    core_1.Input()
], BaseListComponent.prototype, "selectedAction", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "onRefresh", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "onPageChange", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "onSearch", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "select", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "sortHeader", void 0);
__decorate([
    core_1.Output()
], BaseListComponent.prototype, "rowCheckboxChange", void 0);
BaseListComponent = __decorate([
    core_1.Component({
        selector: 'app-list',
        templateUrl: 'list.html',
        styleUrls: ['list.scss']
    })
], BaseListComponent);
exports.BaseListComponent = BaseListComponent;
//# sourceMappingURL=list.js.map