import { Component, Input } from '@angular/core';

/**
 * Provides the base functionality and layout for a general pagefold.
 */
@Component({
  selector: 'arvo-page',
  templateUrl: './page.html',
  styleUrls: ['./page.scss']
})
export class PageComponent {
  /** Title of the page */
  @Input() title: string;
}
