"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const ng2_date_picker_1 = require("ng2-date-picker");
const components = require("./components");
const pipes = require("./pipes");
/** Bootstrap the module */
class CompsModule {
    /** Pass the module as a whole */
    static forRoot() {
        return {
            ngModule: CompsModule
        };
    }
}
CompsModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    router_1.RouterModule,
                    forms_1.FormsModule,
                    ng_bootstrap_1.NgbModule,
                    ng2_date_picker_1.DpDatePickerModule,
                ],
                declarations: [
                    components.AccordionComponent,
                    components.CollapseToggleComponent,
                    components.BaseFormComponent,
                    components.BaseFormFieldComponent,
                    components.InfoPanelComponent,
                    components.BaseListComponent,
                    components.MultiSelectComponent,
                    components.BasePageComponent,
                    components.PageHeaderComponent,
                    components.PanelComponent,
                    components.BaseReadComponent,
                    components.BaseReadFieldComponent,
                    components.SelectBoolComponent,
                    components.BaseTableComponent,
                    pipes.BooleanPipe,
                    pipes.CapitalizePipe,
                    pipes.CentsPipe
                ],
            },] },
];
exports.CompsModule = CompsModule;
//# sourceMappingURL=comps.module.js.map