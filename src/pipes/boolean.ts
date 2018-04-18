import { Pipe, PipeTransform } from '@angular/core';

/** Format a boolean value into capital case */
@Pipe({ name: 'boolean' })
export class BooleanPipe implements PipeTransform {
  /** Transform a unformatted boolean value into a formatted string. */
  transform(value: boolean) {
    return value ? 'Yes' : 'No';
  }
}
