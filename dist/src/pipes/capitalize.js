"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const _ = require("lodash");
/** Formats a value into a cpatialized string */
class CapitalizePipe {
    /** Transform a unformatted value into a formatted string. */
    transform(value, _type, _separator) {
        /*if (type === 'title') {
              let word = value.split(separator).map(_.capitalize).join(separator);
              return word;
            } else if (type === 'all') {
              let word = value.split('').map(_.capitalize).join('');
              return word;
            } else {*/
        /*if (type === 'title') {
          let word = value.split(separator).map(_.capitalize).join(separator);
          return word;
        } else if (type === 'all') {
          let word = value.split('').map(_.capitalize).join('');
          return word;
        } else {*/
        return _.startCase(value);
        // }
    }
}
CapitalizePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'capitalize' },] },
];
exports.CapitalizePipe = CapitalizePipe;
//# sourceMappingURL=capitalize.js.map