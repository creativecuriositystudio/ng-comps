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
let PanelComponent = class PanelComponent {
};
__decorate([
    core_1.Input()
], PanelComponent.prototype, "title", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "collapsable", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "isCollapsed", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "collapseText", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "alignment", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "theme", void 0);
__decorate([
    core_1.Input()
], PanelComponent.prototype, "class", void 0);
PanelComponent = __decorate([
    core_1.Component({
        selector: 'app-panel',
        templateUrl: 'panel.html',
        styleUrls: ['panel.scss']
    })
], PanelComponent);
exports.PanelComponent = PanelComponent;
//# sourceMappingURL=panel.js.map