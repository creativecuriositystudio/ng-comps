import { Component, Input, OnInit } from '@angular/core';
import { Model, ModelConstructor } from 'modelsafe';

import { Location } from '@angular/common';

/** A panel in the read page */
export interface ReadPanel<T> {
  /** Label of the read panel */
  label: string;

  /** Fields to display */
  fields: ReadField<T>[];

  /** Conditional display statement */
  showIf?(instance?: T): any;
}

/** An info panel on the read page */
export interface ReadInfoPanel {
  /** Message in the panel */
  message: string;

  /** Theme of the panel */
  theme?: 'warning' | 'success' | 'info';
}

/** An action to perform on the read page data */
export interface ReadAction {
  /** Label of the read action */
  label: string;

  /** The css class to apply */
  class: string;

  /** Action to perform */
  do(): void;
}

/** A column in the table. */
export interface ReadField<T> {
  /** The label. */
  label: string;

  /** The key name to be passed for two-way binding */
  model?: string;

  /** Show the field if a condition of the data is valid */
  showIf?(instance?: T): any;

  /** Any extra classes for the column container. */
  class?(instance: T): string;

  /** The text format function for the column. This should format the column for display. */
  text?(instance?: T): any;

  /** The HTML format function for the column. This should format the column for display in structured HTML. */
  html?(instance: T): string;
}

/**
 * Provides the base functionality and layout for a read screen.
 */
@Component({
  selector: 'arvo-read',
  templateUrl: './read.html',
  styleUrls: ['./read.scss']
})
export class ReadComponent implements OnInit {
  /** The title of the read screen. */
  @Input() title: string;

  /** The panels to display. */
  @Input() panels: ReadField<Model>[];

  /** The model displayed in the list. */
  @Input() model: ModelConstructor<Model>;

  /** The model instance data. */
  @Input() data: Model[];

  /** Label of the edit button */
  @Input() editLabel: string;

  /** If the edit button needs to be hidden */
  @Input() readOnly: boolean;

  /** List of info panels to display on top of the page */
  @Input() infoPanels: ReadInfoPanel[];

  /** Extra buttons if needed */
  @Input() extraActions: ReadAction[] = [];

  /** Constructs this component */
  constructor(private location: Location) {}

  /** Initializes this component */
  ngOnInit() {
    this.infoPanels = this.infoPanels || [];
  }

  /** Returns to the previous page */
  back() {
    this.location.back();
  }
}
