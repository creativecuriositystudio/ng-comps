import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/** Format a boolean value into capital case */
@Pipe({ name: 'cents' })
export class CentsPipe implements PipeTransform {
  /** Transform a unformatted boolean value into a formatted string. */
  transform(value: any): string {
    let numValue = _.round(+value / 100, 2);
    return '$' + (_.isInteger(numValue) ? numValue : numValue.toFixed(2));
  }
}
