"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**
 * Provides the base functionality and layout for a general pagefold.
 */
class BasePageComponent {
}
BasePageComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-page',
                templateUrl: 'page.html',
                styleUrls: ['page.scss']
            },] },
];
/** @nocollapse */
BasePageComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
};
exports.BasePageComponent = BasePageComponent;
//# sourceMappingURL=page.js.map