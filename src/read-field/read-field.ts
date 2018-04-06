import { Component, Input } from '@angular/core';

/**
 * Provides the base functionality and layout of a field on a read.
 */
@Component({
  selector: 'app-read-field',
  templateUrl: 'read-field.html'
})
export class BaseReadFieldComponent {
  /** The label of the read field. */
  @Input() label: string;

  /** The text displayed on the read field */
  @Input() text: string;

  /** Whether the field should stretch the width of its container */
  @Input() stretched: boolean;
}
