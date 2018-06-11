import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ColorPickerModule } from 'ngx-color-picker';
import * as components from './components';
import * as pipes from './pipes';

/** Module containing all exported elements */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    DpDatePickerModule,
    ColorPickerModule,
  ],

  declarations: [
    components.AccordionComponent,
    components.CollapseToggleComponent,
    components.FormComponent,
    components.FormFieldComponent,
    components.InfoPanelComponent,
    components.ListComponent,
    components.MultiSelectComponent,
    components.PageComponent,
    components.PageHeaderComponent,
    components.PanelComponent,
    components.ReadComponent,
    components.ReadFieldComponent,
    components.SelectBoolComponent,
    components.TableComponent,

    pipes.BooleanPipe,
    pipes.CapitalizePipe,
    pipes.CentsPipe,
  ],

  exports: [
    components.AccordionComponent,
    components.CollapseToggleComponent,
    components.FormComponent,
    components.FormFieldComponent,
    components.InfoPanelComponent,
    components.ListComponent,
    components.MultiSelectComponent,
    components.PageComponent,
    components.PageHeaderComponent,
    components.PanelComponent,
    components.ReadComponent,
    components.ReadFieldComponent,
    components.SelectBoolComponent,
    components.TableComponent,

    pipes.BooleanPipe,
    pipes.CapitalizePipe,
    pipes.CentsPipe,
  ],
})
export class Module {
  /** Pass the module as a whole */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Module
    };
  }
}
