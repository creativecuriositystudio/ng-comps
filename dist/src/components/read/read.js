"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
/**
 * Provides the base functionality and layout for a read screen.
 */
class BaseReadComponent {
    /** Constructs this component */
    constructor(location) {
        this.location = location;
        /** Extra buttons if needed */
        this.extraActions = [];
    }
    /** Initializes this component */
    ngOnInit() {
        this.infoPanels = this.infoPanels || [];
    }
    /** Returns to the previous page */
    back() {
        this.location.back();
    }
}
BaseReadComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-read',
                templateUrl: 'read.html',
                styleUrls: ['read.scss']
            },] },
];
/** @nocollapse */
BaseReadComponent.ctorParameters = () => [
    { type: common_1.Location, },
];
BaseReadComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "panels": [{ type: core_1.Input },],
    "model": [{ type: core_1.Input },],
    "data": [{ type: core_1.Input },],
    "editLabel": [{ type: core_1.Input },],
    "readOnly": [{ type: core_1.Input },],
    "infoPanels": [{ type: core_1.Input },],
    "extraActions": [{ type: core_1.Input },],
};
exports.BaseReadComponent = BaseReadComponent;
//# sourceMappingURL=read.js.map