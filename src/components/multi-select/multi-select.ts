import { Component, HostListener, ElementRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

/** Default list group fields */
export interface DefaultListGroup<T> {
  label: string;
  values: T[];
}

/** Provides a multi-select component */
@Component({
  selector: 'arvo-multi-select',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
  }],
  templateUrl: './multi-select.html',
  styleUrls: ['./multi-select.scss']
})
export class MultiSelectComponent<T> implements ControlValueAccessor {
  /** The input name */
  name: string;

  /** The input text value */
  text: string;

  /** The observable version of the search */
  searchTerm$ = new Subject<string>();

  /** List of mapped selected items */
  selectedItems: T[];

  /** List of result items from search */
  resultItems: T[];

  /** Whether the result list should be displayed */
  showResultList: boolean;

  /** Whether the default list should be displayed */
  showDefaultList: boolean;

  /** List of original selected items */
  public rawSelectedItems: T[];

  /** Callback for receiving the selected items when the list changes */
  public onChangeCallback: (_: T[]) => void;

  /** Callback for receiving the selected items when the list changes */
  public onTouchCallback: () => void;

  /** Default placeholder */
  @Input() placeholder: string;

  /** Emit an event when the search is complete */
  @Output() onSearchComplete: EventEmitter<T[]> = new EventEmitter();

  /** Whether the selected  items should be hidden */
  @Input() hideSelectedItems: boolean;

  /** Whether the search result list should be hidden */
  @Input() hideSearchResult: boolean;

  /** The number of columns to display the default list */
  @Input() column: number;

  /** Whether there is a default list */
  @Input() hasDefaultList: boolean;

  /** Whether the field is readonly */
  @Input() isReadOnly: boolean;

  /** Show ungrouped list provided by outer component */
  @Input() showUngroupedList: boolean;

  /** The text to display on the header of the default list */
  @Input() defaultListText: string;

  /** The groups to show in the default list with group items */
  @Input() defaultListGroups: DefaultListGroup<T>[];

  /** The list items that don't belong to any groups to show by default */
  @Input() defaultListItems: T[];

  /** The typeahead query to get the result items by string */
  @Input() typeAhead: (text: string) => Promise<T[]>;

  /** The label map for determining how to display a given item */
  @Input() labelMap: string | ((val: any) => string) = i => i.toString();

  /** The label map for determining how to display a given item */
  @Input() valueMap: string | ((val: any) => any) = i => i;

  /** Construct this component */
  constructor(private elementRef: ElementRef) {
    this.searchTerm$.debounceTime(500)
      .subscribe(async (term: string) => {
        this.resultItems = await this.typeAhead(term);
        this.showDefaultList = false;
        this.showResultList = this.resultItems.length > 0 ? true : false;
        if (this.showResultList) this.onSearchComplete.emit(this.resultItems);
      });
  }

  /** Register a change callback. */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  /** Clear the search text */
  clearText() {
    this.text = '';
  }

  /** Ignore onTouched */
  registerOnTouched(fn: any) {
    this.onTouchCallback = fn;
  }

  /** Write value to the selected items */
  writeValue(value: T[]) {
    this.rawSelectedItems = value ? value : [];
    this.selectedItems = this.rawSelectedItems.map(i => this.mapValue(i, this.valueMap));
  }

  /**
   * Add an item to the select list and emit the list of selected items
   *
   * @param event  Ngb event containing selected item
   * @param input  HTML Input element
   */
  add(item: T, input: any) {
    if (!this.rawSelectedItems) {
      this.rawSelectedItems = [];
    }

    this.rawSelectedItems.push(item);
    this.selectedItems.push(this.mapValue(item, this.valueMap));

    input.value = '';

    this.onChangeCallback(this.selectedItems);
    this.closeLists();
  }

  /**
   * Remove an item from the selected list
   *
   * @param item  An item to be removed
   */
  async remove(item: T) {
    if (this.isReadOnly) return;

    const index = this.rawSelectedItems.indexOf(item);

    this.rawSelectedItems.splice(index, 1);
    this.selectedItems.splice(index, 1);
    this.onChangeCallback(this.selectedItems);
  }

  /** Clear all selected items */
  async clear() {
    this.rawSelectedItems = [];
    this.selectedItems = [];

    this.onChangeCallback(this.selectedItems);
  }

  /** Listening to clicks outside of the component and close lists */
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeLists();
    }
  }

  /** Close the result list and the default list on clicks outside of the component */
  closeLists() {
    this.showDefaultList = this.showResultList = false;
  }

  /** Show the default list if enabled on input focus */
  onFocus() {
    if (this.isReadOnly) return;
    this.showDefaultList = true;
  }

  /** Emits an event to the parent component with the searched value */
  search(value: string) {
    this.searchTerm$.next(value);
  }

  /** Map the value of each a select item to an object value */
  mapValue(val: any, map: string | ((val: any) => any), defaultValue?: any) {
    return (typeof map === 'function' ? map : _.property(map))(val) || (_.isUndefined(defaultValue) ? val : defaultValue);
  }
}
