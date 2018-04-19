"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Format a boolean value into capital case */
class BooleanPipe {
    /** Transform a unformatted boolean value into a formatted string. */
    transform(value) {
        return value ? 'Yes' : 'No';
    }
}
BooleanPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'boolean' },] },
];
exports.BooleanPipe = BooleanPipe;
//# sourceMappingURL=boolean.js.map