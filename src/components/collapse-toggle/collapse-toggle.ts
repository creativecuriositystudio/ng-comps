import { Component, Input } from '@angular/core';

/**  Provides a collapsable component to any other UI component */
@Component({
  selector: 'arvo-collapse-toggle',
  templateUrl: 'collapse-toggle.html',
  styleUrls: ['collapse-toggle.scss']
})
export class CollapseToggleComponent {
  /** Whether the toggle is collapsed or not. */
  @Input() collapsed: boolean;
}
