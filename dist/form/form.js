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
 * Provides the base functionality and layout for a form screen.
 */
let BaseFormComponent = class BaseFormComponent {
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
};
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "title", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "panels", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "data", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "saveByPath", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "redirectByPath", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "mode", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "hiddenFields", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "hiddenPanels", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "saveLabel", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "cancelLabel", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "saveBtnClass", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "hideCancel", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "hideSave", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "beforeSave", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "blockSave", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "beforeCancel", void 0);
__decorate([
    core_1.Input()
], BaseFormComponent.prototype, "blockCancel", void 0);
__decorate([
    core_1.Output()
], BaseFormComponent.prototype, "onSelect", void 0);
BaseFormComponent = __decorate([
    core_1.Component({
        selector: 'app-form',
        templateUrl: 'form.html',
        styleUrls: ['form.scss']
    })
], BaseFormComponent);
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=form.js.map