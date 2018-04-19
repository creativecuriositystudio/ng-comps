import { PipeTransform } from '@angular/core';
/** Formats a value into a cpatialized string */
export declare class CapitalizePipe implements PipeTransform {
    /** Transform a unformatted value into a formatted string. */
    transform(value: any, _type?: 'first' | 'title' | 'all', _separator?: string): string;
}
