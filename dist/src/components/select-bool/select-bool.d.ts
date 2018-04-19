import { ControlValueAccessor } from '@angular/forms';
/**
 * Provides a yes/no select box.
 */
export declare class SelectBoolComponent implements ControlValueAccessor {
    /** The label of the 'Yes' selection. */
    yes: string;
    /** The label fo the 'No' selection. */
    no: string;
    /** The inner value of the component. */
    private innerValue;
    /** The touched callback. */
    private onTouchedCallback;
    /** The value changed callback. */
    private onChangeCallback;
    /** Get the contained value. */
    /** Set the contained value. */
    value: boolean;
    /** when the component is blurred. */
    onBlur(): void;
    /** Write a value to the contained value. */
    writeValue(val: boolean): void;
    /** Register a change callback. */
    registerOnChange(fn: any): void;
    /** Register a touched callback. */
    registerOnTouched(fn: any): void;
}
