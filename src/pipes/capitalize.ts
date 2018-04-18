import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/** Formats a value into a cpatialized string */
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  /** Transform a unformatted value into a formatted string. */
  transform(value: any, _type?: 'first' | 'title' | 'all', _separator?: string) {
    /*if (type === 'title') {
      let word = value.split(separator).map(_.capitalize).join(separator);
      return word;
    } else if (type === 'all') {
      let word = value.split('').map(_.capitalize).join('');
      return word;
    } else {*/
      return _.startCase(value);
    // }
  }
}
