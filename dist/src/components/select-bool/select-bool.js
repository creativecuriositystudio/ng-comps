"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
/**
 * Provides a yes/no select box.
 */
class SelectBoolComponent {
    constructor() {
        /** The label of the 'Yes' selection. */
        this.yes = 'Yes';
        /** The label fo the 'No' selection. */
        this.no = 'No';
        /** The touched callback. */
        this.onTouchedCallback = () => {
            /* don't do anything */ 
        };
        /** The value changed callback. */
        this.onChangeCallback = () => {
            /* don't do anything */ 
        };
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
}
SelectBoolComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-select-bool',
                templateUrl: 'select-bool.html',
                providers: [{
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => SelectBoolComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
SelectBoolComponent.propDecorators = {
    "yes": [{ type: core_1.Input },],
    "no": [{ type: core_1.Input },],
};
exports.SelectBoolComponent = SelectBoolComponent;
//# sourceMappingURL=select-bool.js.map