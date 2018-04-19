import { Component, Input, OnInit } from '@angular/core';

/** Interface for providing togglable icons */
export interface ToggleIcon {
  show: string;
  hide: string;
}

/** Provide an accordion component */
@Component({
  selector: 'arvo-accordion',
  templateUrl: 'accordion.html',
  styleUrls: ['accordion.scss']
})
export class AccordionComponent implements OnInit {
  /** Title of the accordion */
  @Input() title: string;

  /** Whether the accordion is toggled */
  @Input() isCollapsed: boolean;

  /** Togglable font-awesone icon strings provided as per ToggleIcon interface */
  @Input() icons?: ToggleIcon;

  /** If no icons are provided, set a default set */
  ngOnInit() {
    if (!this.icons) {
      this.icons = {
        show: 'fa-chevron-down',
        hide: 'fa-chevron-right'
      };
    }
  }
}
