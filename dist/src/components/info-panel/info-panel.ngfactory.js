"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
const i0 = require("./info-panel.scss.shim.ngstyle");
const i1 = require("@angular/core");
const i2 = require("@angular/common");
const i3 = require("./info-panel");
var styles_InfoPanelComponent = [i0.styles];
var RenderType_InfoPanelComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_InfoPanelComponent, data: {} });
exports.RenderType_InfoPanelComponent = RenderType_InfoPanelComponent;
function View_InfoPanelComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 3, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), i1.ɵncd(null, 0), (_l()(), i1.ɵted(-1, null, ["\n  "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵinlineInterpolate(1, "card-block ", _co.class, ""); _ck(_v, 0, 0, currVal_0); }); }
function View_InfoPanelComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_InfoPanelComponent_1)), i1.ɵdid(3, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = !_co.isCollapsed; _ck(_v, 3, 0, currVal_1); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i1.ɵinlineInterpolate(1, "card mb-3 ", _co.theme, ""); _ck(_v, 0, 0, currVal_0); }); }
exports.View_InfoPanelComponent_0 = View_InfoPanelComponent_0;
function View_InfoPanelComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-info-panel", [], null, null, null, View_InfoPanelComponent_0, RenderType_InfoPanelComponent)), i1.ɵdid(1, 49152, null, 0, i3.InfoPanelComponent, [], null, null)], null, null); }
exports.View_InfoPanelComponent_Host_0 = View_InfoPanelComponent_Host_0;
var InfoPanelComponentNgFactory = i1.ɵccf("app-info-panel", i3.InfoPanelComponent, View_InfoPanelComponent_Host_0, { theme: "theme", class: "class" }, {}, ["*"]);
exports.InfoPanelComponentNgFactory = InfoPanelComponentNgFactory;
//# sourceMappingURL=info-panel.ngfactory.js.map