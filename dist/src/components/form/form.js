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
const common_1 = require("@angular/common");
const _ = require("lodash");
/**
 * Provides the base functionality and layout for a form screen.
 */
class BaseFormComponent {
    /** Constructs this component */
    constructor(location) {
        this.location = location;
        /** Hook called when value is selected */
        this.onSelect = new core_1.EventEmitter();
        /** Whether the form is being saved. */
        this.isSaving = false;
        /** Any field errors returned from the backend. */
        this.errors = {};
        /** Constraint errors that can't be displayed */
        this.constraintErrors = [];
    }
    /** Initializes this component */
    ngOnInit() {
        if (this.panels) {
            this.hiddenFields = this.hiddenFields || [];
            this.hiddenPanels = this.hiddenPanels || [];
            this.panels = this.panels.filter(i => !_.includes(this.hiddenPanels, i.label));
            this.panels.forEach(p => p.fields = p.fields.filter(i => !_.includes(this.hiddenFields, i.model)));
        }
    }
    /** Saves the form data */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isSaving = true;
            this.constraintErrors = [];
            if (this.beforeSave)
                yield this.beforeSave();
            // FIXME move this into parent
            /*
                try {
                  if (!this.blockSave) {
                    let task = await this.rest.save(this.model, this.data, { idPath: this.saveByPath || 'id' });
                    this.router.navigate(
                      [this.data.id ? '../..' : '..', this.redirectByPath ? task[this.redirectByPath] : task.id],
                      { relativeTo: this.route }
                    );
                  }
                } catch (err) {
                  if (err.errors) {
                    this.errors = (err as RESTError).errors || {};
                  }
            
                  // Show the relevant error message
                  this.error = this.handleErrorMessage(err);
                  if (!this.error) this.error = err.message;
                }
                */
            let constraintErrors = this.errors.$constraints;
            if (constraintErrors && _.size(constraintErrors) > 0) {
                _.each(constraintErrors, (value, key) => {
                    this.constraintErrors.push({
                        field: _.upperCase(key),
                        message: value.map((v) => _.startCase(v.message))
                    });
                });
            }
            this.isSaving = false;
        });
    }
    /** Handles the error message from the backend, returning either a 'pretty print' version or the message */
    handleErrorMessage(error) {
        try {
            let errs = [];
            for (let i = 0; i < _.values(error.errors).length; ++i) {
                errs[i] = [
                    _.startCase(Object.keys(error.errors)[i]),
                    _.values(error.errors)[i].map((e) => _.lowerCase(e.message)).join(' and ')
                ].join(' ');
            }
            return errs.join('. ');
        }
        catch (err) {
            return error.message;
        }
    }
    /**
       * Cancel saving the model data and navigate back.
       */
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.beforeCancel)
                yield this.beforeCancel();
            if (!this.blockCancel)
                this.location.back();
        });
    }
}
BaseFormComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-form',
                templateUrl: 'form.html',
                styleUrls: ['form.scss']
            },] },
];
/** @nocollapse */
BaseFormComponent.ctorParameters = () => [
    { type: common_1.Location, },
];
BaseFormComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "panels": [{ type: core_1.Input },],
    "model": [{ type: core_1.Input },],
    "data": [{ type: core_1.Input },],
    "saveByPath": [{ type: core_1.Input },],
    "redirectByPath": [{ type: core_1.Input },],
    "mode": [{ type: core_1.Input },],
    "hiddenFields": [{ type: core_1.Input },],
    "hiddenPanels": [{ type: core_1.Input },],
    "saveLabel": [{ type: core_1.Input },],
    "cancelLabel": [{ type: core_1.Input },],
    "saveBtnClass": [{ type: core_1.Input },],
    "hideCancel": [{ type: core_1.Input },],
    "hideSave": [{ type: core_1.Input },],
    "beforeSave": [{ type: core_1.Input },],
    "blockSave": [{ type: core_1.Input },],
    "beforeCancel": [{ type: core_1.Input },],
    "blockCancel": [{ type: core_1.Input },],
    "onSelect": [{ type: core_1.Output },],
};
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=form.js.map