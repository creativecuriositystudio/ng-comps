"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const _ = require("lodash");
/** Formats a value into a cpatialized string */
let CapitalizePipe = class CapitalizePipe {
    /** Transform a unformatted value into a formatted string. */
    transform(value, _type, _separator) {
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
};
CapitalizePipe = __decorate([
    core_1.Pipe({ name: 'capitalize' })
], CapitalizePipe);
exports.CapitalizePipe = CapitalizePipe;
//# sourceMappingURL=capitalize.js.map