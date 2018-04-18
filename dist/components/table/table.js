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
const _ = require("lodash");
/**
 * Provides the base functionality and layout for a generic table.
 */
let BaseTableComponent = class BaseTableComponent {
    /**
     * Provides the base functionality and layout for a generic table.
     */
    constructor() {
        /** Whether the table should have hoverable rows. */
        this.showHover = false;
        /** The empty message displayed when there are no rows. */
        this.empty = 'No rows available.';
        /** The columns for the table. */
        this.columns = [];
        /** The action each columns perform. */
        this.actions = [];
        /** Emits event when a table row is selected. */
        this.select = new core_1.EventEmitter();
        /** Emits when a table header is clicked */
        this.sortHeader = new core_1.EventEmitter();
        /** On row checkbox update, emit an event to the outer component */
        this.rowCheckboxChange = new core_1.EventEmitter();
        /** On row select-lsit update, emit an event to the outer component */
        this.rowSelectListChange = new core_1.EventEmitter();
    }
    /** Listen to table row selections. */
    onSelect(row) {
        this.select.emit(row);
    }
    /** Listen to when a header column is clicked */
    onHeaderSelect(field) {
        this.sortHeader.emit(field);
    }
    /** Check whether a given value is an array */
    valueIsArray(value) {
        return _.isArray(value);
    }
    /** Update the checkbox and emits an event to the parent component */
    updateRowCheckbox(row) {
        return __awaiter(this, void 0, void 0, function* () {
            row.checked = !row.checked;
            this.rowCheckboxChange.emit(row);
        });
    }
    /** Update the select-list and emits an event to the parent component */
    updateSelectList(row) {
        return __awaiter(this, void 0, void 0, function* () {
            row.selected = !row.selected;
            this.rowSelectListChange.emit(row);
        });
    }
    /** Mark every row as selected */
    selectAll() {
        this.selected = !this.selected;
        this.rows.filter(i => i.selected = this.selected);
    }
    /** Processes the input values */
    processInputValues(values, row) {
        return typeof values === 'function' ? values(row) : values;
    }
};
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "showHover", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "empty", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "isEditing", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "columns", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "actions", void 0);
__decorate([
    core_1.Input()
], BaseTableComponent.prototype, "checkboxAction", void 0);
__decorate([
    core_1.Output()
], BaseTableComponent.prototype, "select", void 0);
__decorate([
    core_1.Output()
], BaseTableComponent.prototype, "sortHeader", void 0);
__decorate([
    core_1.Output()
], BaseTableComponent.prototype, "rowCheckboxChange", void 0);
__decorate([
    core_1.Output()
], BaseTableComponent.prototype, "rowSelectListChange", void 0);
BaseTableComponent = __decorate([
    core_1.Component({
        selector: 'app-table',
        templateUrl: 'table.html',
        styleUrls: ['table.scss']
    })
], BaseTableComponent);
exports.BaseTableComponent = BaseTableComponent;
//# sourceMappingURL=table.js.map