import { PipeTransform } from '@angular/core';
/** Format a boolean value into capital case */
export declare class BooleanPipe implements PipeTransform {
    /** Transform a unformatted boolean value into a formatted string. */
    transform(value: boolean): "Yes" | "No";
}
