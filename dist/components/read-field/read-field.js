"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**
 * Provides the base functionality and layout of a field on a read.
 */
let BaseReadFieldComponent = class BaseReadFieldComponent {
};
__decorate([
    core_1.Input()
], BaseReadFieldComponent.prototype, "label", void 0);
__decorate([
    core_1.Input()
], BaseReadFieldComponent.prototype, "text", void 0);
__decorate([
    core_1.Input()
], BaseReadFieldComponent.prototype, "stretched", void 0);
BaseReadFieldComponent = __decorate([
    core_1.Component({
        selector: 'app-read-field',
        templateUrl: 'read-field.html'
    })
], BaseReadFieldComponent);
exports.BaseReadFieldComponent = BaseReadFieldComponent;
//# sourceMappingURL=read-field.js.map