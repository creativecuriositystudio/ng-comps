import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Provide an accordion component */
@Component({
  selector: 'arvo-panel',
  templateUrl: './panel.html',
  styleUrls: ['./panel.scss']
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

  /** Text shown when the panel is collapsed */
  @Input() hideText: string;

  /** The alignment of the panel title using bootstrap class */
  @Input() alignment: string;

  /** Extra class for panel */
  @Input() class: string;

  /** Event emitted on panel hide/open */
  @Output() collapseToggle: EventEmitter<boolean> = new EventEmitter();

  /** Toggles the collapsed toggle boolean and emits event */
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseToggle.emit(this.isCollapsed);
  }
}
