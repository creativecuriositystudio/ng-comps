"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Provide an accordion component */
class AccordionComponent {
    /** If no icons are provided, set a default set */
    ngOnInit() {
        if (!this.icons) {
            this.icons = {
                show: 'fa-chevron-down',
                hide: 'fa-chevron-right'
            };
        }
    }
}
AccordionComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-accordion',
                templateUrl: 'accordion.html',
                styleUrls: ['accordion.scss']
            },] },
];
/** @nocollapse */
AccordionComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "isCollapsed": [{ type: core_1.Input },],
    "icons": [{ type: core_1.Input },],
};
exports.AccordionComponent = AccordionComponent;
//# sourceMappingURL=accordion.js.map