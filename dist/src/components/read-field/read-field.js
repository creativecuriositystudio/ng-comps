"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**
 * Provides the base functionality and layout of a field on a read.
 */
class BaseReadFieldComponent {
}
BaseReadFieldComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-read-field',
                templateUrl: 'read-field.html'
            },] },
];
/** @nocollapse */
BaseReadFieldComponent.propDecorators = {
    "label": [{ type: core_1.Input },],
    "text": [{ type: core_1.Input },],
    "stretched": [{ type: core_1.Input },],
};
exports.BaseReadFieldComponent = BaseReadFieldComponent;
//# sourceMappingURL=read-field.js.map