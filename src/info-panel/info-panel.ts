import { Component, Input, OnInit } from '@angular/core';

/** Provide an accordion component */
@Component({
  selector: 'app-info-panel',
  templateUrl: 'info-panel.html',
  styleUrls: ['info-panel.scss']
})
export class InfoPanelComponent implements OnInit {
  /** Class of the panel theme color */
  @Input() theme: string;

  /** The class of the panel body */
  @Input() class: string;

  /** If it is collapsed */
  isCollapsed: any;

  constructor() {}

  /** If no icons are provided, set a default set */
  ngOnInit() {}
}
