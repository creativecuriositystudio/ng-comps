"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const validator = require("validator");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const TypeCheckers = [
    { type: 'required', error: 'Field can\'t be empty', validate: (value) => _.isString(value) ? !!value : !_.isNil(value) },
    { type: 'number', error: 'Field is not a number', validate: (value) => _.isNumber(value) },
    { type: 'percent', error: 'Field is not a valid percentage', validate: (value) => _.isNumber(value) },
    { type: 'integer', error: 'Field is not an integer', validate: (value) => _.isInteger(value) },
    { type: 'email', error: 'Field is not a valid email', validate: (value) => validator.isEmail(value) },
    { type: 'date', error: 'Field format must be dd/mm/yyyy', validate: (value) => moment(value).isValid() },
    { type: 'daytime', error: 'Field format must be dd/mm/yyyy hh:mm a', validate: (value) => moment(value).isValid() },
];
/**
 * Provides the base functionality and layout of a field on a form.
 */
let BaseFormFieldComponent = BaseFormFieldComponent_1 = class BaseFormFieldComponent {
    /**
     * Provides the base functionality and layout of a field on a form.
     */
    constructor() {
        /** Emits the value of the selected item on user select */
        this.onSelect = new core_1.EventEmitter();
        /** Whether newly written value (from parent) has been retrieved by the input */
        this.isValueRetrieved = true;
        /** The label and value map for select values, if required */
        this.valuesMap = {};
        /** The format the date output type should be */
        this.dateOutputType = 'date';
        /** The label map for determining how to display a given item */
        this.labelMap = i => i.toString();
        /** The label map for determining how to display a given item */
        this.valueMap = i => i;
        /** The touched callback. */
        this.onTouchedCallback = () => { };
        /** The value changed callback. */
        this.onChangeCallback = () => { };
    }
    /** Get the input value. */
    get value() {
        this.isValueRetrieved = true;
        return this.innerValue;
    }
    /** Set the inner value, and emit the formatted value as the model value */
    set value(val) {
        if (!this.isValueRetrieved)
            return;
        // Save new value to inner value
        switch (this.type) {
            // Prevent a lock-up with the datepicker in the event it returns a non-moment value (ie. it returns a value it can't handle itself...)
            case 'date':
            case 'daytime':
                if (moment.isMoment(val))
                    this.innerValue = val;
                break;
            default: this.innerValue = val;
        }
        // Convert the inner value to the model format before emitting
        let convertedValue = val;
        switch (this.type) {
            case 'percent':
                convertedValue = this.fromPercent(val);
                break;
            case 'cents':
                convertedValue = this.toCents(val);
                break;
            case 'number':
                convertedValue = val && validator.isFloat(val) ? Number(val) : val;
                break;
            case 'integer':
                convertedValue = val && validator.isNumeric(val) ? Number(val) : val;
                break;
            case 'date':
            case 'daytime':
                convertedValue = this.formatDateOutput(val);
                break;
        }
        // Emit model value if it's not the same as before
        if (convertedValue !== this.convertedValue) {
            this.convertedValue = convertedValue;
            this.onChangeCallback(this.convertedValue);
        }
    }
    /** Format the incoming model value */
    writeValue(val) {
        this.convertedValue = val;
        switch (this.type) {
            case 'percent':
                val = this.toPercent(val);
                break;
            case 'date':
                val = val ? moment.utc(val).startOf('day') : null;
                break;
            case 'daytime':
                val = val ? moment(val) : null;
                break;
        }
        this.innerValue = val;
        this.isValueRetrieved = false;
    }
    /** Prepare values */
    ngOnInit() {
        this.prepareValues();
    }
    /** Prepare values */
    ngOnChanges() {
        this.prepareValues();
    }
    /** Formats the date output */
    formatDateOutput(value) {
        if (!value)
            return null;
        if (this.type === 'date')
            value = moment(value).utc(true).startOf('day');
        else
            value = moment(value);
        return this.dateOutputType === 'moment' ? value :
            this.dateOutputType === 'string' ? value.toISOString() :
                value.toDate();
    }
    /** If the values are still loading, indicate to the user and show them the values once ready */
    prepareValues() {
        this.isLoading = this.values && this.values instanceof Promise;
        if (this.isLoading) {
            this.values.then(i => {
                this.values = i;
                this.isLoading = false;
            });
        }
    }
    /** when the component is blurred. */
    onBlur() {
        this.onTouchedCallback();
    }
    /** Validate the input field */
    validate() {
        setTimeout(() => {
            this.errors = [];
            let fieldExists;
            if (this.isRequired) {
                const requireCheck = TypeCheckers.find(i => i.type === 'required');
                fieldExists = requireCheck.validate(this.convertedValue);
                if (!fieldExists)
                    this.errors.push({ message: requireCheck.error });
            }
            const typeCheck = TypeCheckers.find(i => i.type === this.type);
            if ((fieldExists || this.convertedValue) && typeCheck) {
                if (!typeCheck.validate(this.convertedValue))
                    this.errors.push({ message: typeCheck.error });
            }
        }, 200);
    }
    /** Register a change callback. */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /** Register a touched callback. */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /** Update the select value for two-way binding and emits the name of the select input */
    updateSelect(event) {
        this.value = event;
        this.onSelect.emit({ value: this.convertedValue, name: this.name });
    }
    /** Update the select value and emit the name of the input */
    updateFile(event) {
        this.onSelect.emit(event.srcElement.files);
    }
    /** Opens the date picker window */
    openCalendar() {
        if (this.isReadOnly)
            return;
        this.datePickerElement.api.open();
    }
    /** Convert from backend percent format to human format */
    toPercent(value) {
        return Number(value) && !isNaN(Number(value)) ? new common_1.PercentPipe('en').transform(Number(value), '1.0-5').slice(0, -1) : '';
    }
    /** Convert from human percent format to backend format */
    fromPercent(str) {
        return String(str).match(/-?\d+(\.\d+)?%?/) ? +String(str).replace(/[^\d.-]/g, '') / 100 : 0;
    }
    /** Converts from cents */
    // FIXME make this generic
    fromCents(cents) {
        return cents ? (cents / 100).toString() : '';
    }
    /** Converts to cents */
    toCents(value) {
        if (!value.match(/\$?([\d,]*[\d])(\.\d\d*)?/))
            return 0;
        let [dollars, cents] = value.replace(/[^\d.]/g, '').split('.');
        return +dollars * 100 + (!cents || cents.length === 0 ? 0 : cents.length === 1 ? +cents * 10 : +cents.slice(0, 2));
    }
    /** Map the value of each a select item to an object value */
    mapValue(val, map, defaultValue) {
        let value = typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' ? val :
            (typeof map === 'function' ? map : _.property(map))(val);
        return _.isNil(value) ? defaultValue : value;
    }
};
__decorate([
    core_1.Output()
], BaseFormFieldComponent.prototype, "onSelect", void 0);
__decorate([
    core_1.ViewChild('datePicker')
], BaseFormFieldComponent.prototype, "datePickerElement", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "typeAhead", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "type", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "name", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "label", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "prefix", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "affix", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "isRequired", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "isReadOnly", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "isWide", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "values", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "valuesMap", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "errors", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "dateOutputType", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "regex", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "column", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "hasDefaultList", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "showUngroupedList", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "defaultListText", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "defaultListGroups", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "defaultListItems", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "outputType", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "labelMap", void 0);
__decorate([
    core_1.Input()
], BaseFormFieldComponent.prototype, "valueMap", void 0);
BaseFormFieldComponent = BaseFormFieldComponent_1 = __decorate([
    core_1.Component({
        selector: 'app-form-field',
        templateUrl: 'form-field.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => BaseFormFieldComponent_1),
                multi: true
            }],
    })
], BaseFormFieldComponent);
exports.BaseFormFieldComponent = BaseFormFieldComponent;
var BaseFormFieldComponent_1;
//# sourceMappingURL=form-field.js.map