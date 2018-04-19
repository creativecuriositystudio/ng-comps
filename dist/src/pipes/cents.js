"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const _ = require("lodash");
/** Format a boolean value into capital case */
class CentsPipe {
    /** Transform a unformatted boolean value into a formatted string. */
    transform(value) {
        let numValue = _.round(+value / 100, 2);
        return '$' + (_.isInteger(numValue) ? numValue : numValue.toFixed(2));
    }
}
CentsPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'cents' },] },
];
exports.CentsPipe = CentsPipe;
//# sourceMappingURL=cents.js.map