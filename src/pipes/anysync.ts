import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/** Format a boolean value into capital case */
@Pipe({ name: 'anysync' })
export class AnysyncPipe implements PipeTransform {
  /** Transform a unformatted boolean value into a formatted string. */
  async transform(value: any) {
    if (_.isObject(value) && value.then) {
      value = await value;
    }

    return value;
  }
}
