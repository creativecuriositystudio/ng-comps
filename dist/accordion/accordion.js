"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** Provide an accordion component */
let AccordionComponent = class AccordionComponent {
    constructor() { }
    /** If no icons are provided, set a default set */
    ngOnInit() {
        if (!this.icons) {
            this.icons = {
                show: 'fa-chevron-down',
                hide: 'fa-chevron-right'
            };
        }
    }
};
__decorate([
    core_1.Input()
], AccordionComponent.prototype, "title", void 0);
__decorate([
    core_1.Input()
], AccordionComponent.prototype, "isCollapsed", void 0);
__decorate([
    core_1.Input()
], AccordionComponent.prototype, "icons", void 0);
AccordionComponent = __decorate([
    core_1.Component({
        selector: 'app-accordion',
        templateUrl: 'accordion.html',
        styleUrls: ['accordion.scss']
    })
], AccordionComponent);
exports.AccordionComponent = AccordionComponent;
//# sourceMappingURL=accordion.js.map