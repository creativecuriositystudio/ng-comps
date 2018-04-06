"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
/**
 * Provides a yes/no select box.
 */
let SelectBoolComponent = SelectBoolComponent_1 = class SelectBoolComponent {
    /**
     * Provides a yes/no select box.
     */
    constructor() {
        /** The label of the 'Yes' selection. */
        this.yes = 'Yes';
        /** The label fo the 'No' selection. */
        this.no = 'No';
        /** The touched callback. */
        this.onTouchedCallback = () => { };
        /** The value changed callback. */
        this.onChangeCallback = () => { };
    }
    /** Get the contained value. */
    get value() {
        return this.innerValue;
    }
    /** Set the contained value. */
    set value(val) {
        if (this.innerValue !== val) {
            this.innerValue = val;
            this.onChangeCallback(val);
        }
    }
    /** when the component is blurred. */
    onBlur() {
        this.onTouchedCallback();
    }
    /** Write a value to the contained value. */
    writeValue(val) {
        if (this.innerValue !== val) {
            this.innerValue = val;
        }
    }
    /** Register a change callback. */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /** Register a touched callback. */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
};
__decorate([
    core_1.Input()
], SelectBoolComponent.prototype, "yes", void 0);
__decorate([
    core_1.Input()
], SelectBoolComponent.prototype, "no", void 0);
SelectBoolComponent = SelectBoolComponent_1 = __decorate([
    core_1.Component({
        selector: 'app-select-bool',
        templateUrl: 'select-bool.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => SelectBoolComponent_1),
                multi: true
            }]
    })
], SelectBoolComponent);
exports.SelectBoolComponent = SelectBoolComponent;
var SelectBoolComponent_1;
//# sourceMappingURL=select-bool.js.map