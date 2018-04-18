import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Provides a yes/no select box.
 */
@Component({
  selector: 'app-select-bool',
  templateUrl: 'select-bool.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectBoolComponent),
    multi: true
  }]
})
export class SelectBoolComponent implements ControlValueAccessor {
  /** The label of the 'Yes' selection. */
  @Input() yes = 'Yes';

  /** The label fo the 'No' selection. */
  @Input() no = 'No';

  /** The inner value of the component. */
  private innerValue: boolean;

  /** The touched callback. */
  private onTouchedCallback: any = () => { /* don't do anything */ };

  /** The value changed callback. */
  private onChangeCallback: any = () => { /* don't do anything */ };

  /** Get the contained value. */
  get value(): boolean {
    return this.innerValue;
  }

  /** Set the contained value. */
  set value(val: boolean) {
    if (this.innerValue !== val) {
      this.innerValue = val;

      this.onChangeCallback(val);
    }
  }

  /** when the component is blurred. */
  onBlur() {
    this.onTouchedCallback();
  }

  /** Write a value to the contained value. */
  writeValue(val: boolean) {
    if (this.innerValue !== val) {
      this.innerValue = val;
    }
  }

  /** Register a change callback. */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  /** Register a touched callback. */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
