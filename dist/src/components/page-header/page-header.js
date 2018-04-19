"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Provide an accordion component */
class PageHeaderComponent {
    /** If no icons are provided, set a default set */
    ngOnInit() {
        this.background = this.background || 'primary';
    }
}
PageHeaderComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'page-header',
                templateUrl: 'page-header.html',
                styleUrls: ['page-header.scss']
            },] },
];
/** @nocollapse */
PageHeaderComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "collapsable": [{ type: core_1.Input },],
    "isCollapsed": [{ type: core_1.Input },],
    "collapseText": [{ type: core_1.Input },],
    "alignment": [{ type: core_1.Input },],
    "background": [{ type: core_1.Input },],
    "specificStyle": [{ type: core_1.Input },],
};
exports.PageHeaderComponent = PageHeaderComponent;
//# sourceMappingURL=page-header.js.map