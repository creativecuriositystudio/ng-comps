import { Component, Input } from '@angular/core';

/** Provide an accordion component */
@Component({
  selector: 'arvo-info-panel',
  templateUrl: 'info-panel.html',
  styleUrls: ['info-panel.scss']
})
export class InfoPanelComponent {
  /** Class of the panel theme color */
  @Input() theme: string;

  /** The class of the panel body */
  @Input() class: string;

  /** If it is collapsed */
  isCollapsed: any;
}
