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
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/operator/do");
const _ = require("lodash");
/** Provides a multi-select component */
let MultiSelectComponent = MultiSelectComponent_1 = class MultiSelectComponent {
    /** Construct this component */
    constructor(elementRef) {
        this.elementRef = elementRef;
        /** The observable version of the search */
        this.searchTerm$ = new rxjs_1.Subject();
        /** The label map for determining how to display a given item */
        this.labelMap = i => i.toString();
        /** The label map for determining how to display a given item */
        this.valueMap = i => i;
        this.searchTerm$.debounceTime(500)
            .subscribe((term) => __awaiter(this, void 0, void 0, function* () {
            this.resultItems = yield this.typeAhead(term);
            this.showDefaultList = false;
            this.showResultList = this.resultItems.length > 0 ? true : false;
        }));
    }
    /* tslint:disable:use-life-cycle-interface */
    /** Prepare values if there is any */
    ngOnInit() {
    }
    /** Register a change callback. */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /** Ignore onTouched */
    registerOnTouched(fn) {
        this.onTouchCallback = fn;
    }
    /** Write value to the selected items */
    writeValue(value) {
        this.rawSelectedItems = value ? value : [];
        this.selectedItems = this.rawSelectedItems.map(i => this.mapValue(i, this.valueMap));
    }
    /**
     * Add an item to the select list and emit the list of selected items
     *
     * @param event  Ngb event containing selected item
     * @param input  HTML Input element
     */
    add(item, input) {
        if (!this.rawSelectedItems) {
            this.rawSelectedItems = [];
        }
        this.rawSelectedItems.push(item);
        this.selectedItems.push(this.mapValue(item, this.valueMap));
        input.value = '';
        this.onChangeCallback(this.selectedItems);
        this.closeLists();
    }
    /**
     * Remove an item from the selected list
     *
     * @param item  An item to be removed
     */
    remove(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isReadOnly)
                return;
            const index = this.rawSelectedItems.indexOf(item);
            this.rawSelectedItems.splice(index, 1);
            this.selectedItems.splice(index, 1);
            this.onChangeCallback(this.selectedItems);
        });
    }
    /** Clear all selected items */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.rawSelectedItems = [];
            this.selectedItems = [];
            this.onChangeCallback(this.selectedItems);
        });
    }
    /** Listening to clicks outside of the component and close lists */
    clickout(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closeLists();
        }
    }
    /** Close the result list and the default list on clicks outside of the component */
    closeLists() {
        this.showDefaultList = this.showResultList = false;
    }
    /** Show the default list if enabled on input focus */
    onFocus() {
        if (this.isReadOnly)
            return;
        this.showDefaultList = true;
    }
    /** Emits an event to the parent component with the searched value */
    search(value) {
        this.searchTerm$.next(value);
    }
    /** Map the value of each a select item to an object value */
    mapValue(val, map, defaultValue) {
        return (typeof map === 'function' ? map : _.property(map))(val) || (_.isUndefined(defaultValue) ? val : defaultValue);
    }
};
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "column", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "hasDefaultList", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "isReadOnly", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "showUngroupedList", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "defaultListText", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "defaultListGroups", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "defaultListItems", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "typeAhead", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "labelMap", void 0);
__decorate([
    core_1.Input()
], MultiSelectComponent.prototype, "valueMap", void 0);
__decorate([
    core_1.HostListener('document:click', ['$event'])
], MultiSelectComponent.prototype, "clickout", null);
MultiSelectComponent = MultiSelectComponent_1 = __decorate([
    core_1.Component({
        selector: 'app-multi-select',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => MultiSelectComponent_1),
                multi: true
            }],
        templateUrl: 'multi-select.html',
        styleUrls: ['multi-select.scss']
    })
], MultiSelectComponent);
exports.MultiSelectComponent = MultiSelectComponent;
var MultiSelectComponent_1;
//# sourceMappingURL=multi-select.js.map