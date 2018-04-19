"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/**  Provides a collapsable component to any other UI component */
class CollapseToggleComponent {
}
CollapseToggleComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-collapse-toggle',
                templateUrl: 'collapse-toggle.html',
                styleUrls: ['collapse-toggle.scss']
            },] },
];
/** @nocollapse */
CollapseToggleComponent.propDecorators = {
    "collapsed": [{ type: core_1.Input },],
};
exports.CollapseToggleComponent = CollapseToggleComponent;
//# sourceMappingURL=collapse-toggle.js.map