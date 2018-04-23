import { Component, Input, OnInit } from '@angular/core';

/** Provide an accordion component */
@Component({
  selector: 'arvo-page-header',
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeaderComponent implements OnInit {
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

  /** Class of the panel background color */
  @Input() background: 'primary' | 'secondary' | 'tertiary' | 'quarternary';

  /** Class to define the height of the card if neccessary - currently being used for premium-cards */
  @Input() specificStyle: string;

  /** If no icons are provided, set a default set */
  ngOnInit() {
    this.background = this.background || 'primary';
  }
}
