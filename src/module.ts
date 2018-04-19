import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';
import * as components from './components';
import * as pipes from './pipes';

/** Bootstrap the module */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    DpDatePickerModule,
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
})
export class ArvoNgModule {
  /** Pass the module as a whole */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArvoNgModule
    };
  }
}
