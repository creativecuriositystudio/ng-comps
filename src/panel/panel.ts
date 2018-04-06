import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Provide an accordion component */
@Component({
  selector: 'app-panel',
  templateUrl: 'panel.html',
  styleUrls: ['panel.scss']
})
export class PanelComponent {
  /** Title of the accordion */
  @Input() title: string;

  /** Whether the panel is collapsable */
  @Input() collapsable: boolean;

  /** Whether the accordion is toggled */
  @Input() isCollapsed: boolean;

  /** Text next to the collapse symbol */
  @Input() collapseText: string;

  /** The alignment of the panel title using bootstrap class */
  @Input() alignment: string;

  /** Class of the panel theme color */
  @Input() theme: string;

  /** Extra class for panel */
  @Input() class: string;

  constructor() {}
}
