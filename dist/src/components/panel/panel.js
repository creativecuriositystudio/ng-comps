"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Provide an accordion component */
class PanelComponent {
}
PanelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-panel',
                templateUrl: 'panel.html',
                styleUrls: ['panel.scss']
            },] },
];
/** @nocollapse */
PanelComponent.propDecorators = {
    "title": [{ type: core_1.Input },],
    "collapsable": [{ type: core_1.Input },],
    "isCollapsed": [{ type: core_1.Input },],
    "collapseText": [{ type: core_1.Input },],
    "alignment": [{ type: core_1.Input },],
    "theme": [{ type: core_1.Input },],
    "class": [{ type: core_1.Input },],
};
exports.PanelComponent = PanelComponent;
//# sourceMappingURL=panel.js.map