import { Input, Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem, NavigationService } from '../../../../services/navigation';

/** Provides a nav item that works recursively for sub-nav */
@Component({
  selector: 'app-nav-item',
  templateUrl: 'nav-item.html',
  styleUrls: ['nav-item.scss']
})
export class NavItemComponent implements OnInit, OnChanges {
  /** Navigation items data */
  @Input() data: NavItem;

  /** Constructs this component */
  constructor(private router: Router, private cdr: ChangeDetectorRef, private navigation: NavigationService) {
  }

  /** Whether the url is active */
  get isUrlActive(): boolean {
    let urls = this.router.url.split('/').slice(1);
    let isActive: boolean;

    let urlArrays = this.navigation.getUrlsArray(this.data);
    let index = urlArrays.indexOf(this.data.url);

    isActive = index !== 0 ?
      (urlArrays[index] === urls[index]) && (urlArrays[index - 1] === urls[index - 1]) :
      urls.indexOf(this.data.url) > -1 ? true : false;

    return isActive;
  }

  /** Initializes this component */
  ngOnInit() {
    // this.initNavItems();
    // this.cdr.detectChanges();
  }

  /** Triggers change when there's an update on the nav item data */
  ngOnChanges() {
    // this.initNavItems();
    // this.cdr.detectChanges();
  }

  /** Initalizes the nav items and set their each item parent accordingly */
  initNavItems() {
    this.data.toggle = this.isUrlActive;
  }

  /** Go to the URL of that nav item or toggle sub-nav */
  async goto(item: NavItem) {
    if (!item) {
      this.data.toggle = !this.data.toggle;
      this.cdr.detectChanges();
      return;
    }

    const navItemVisitable = item.url && item.children && item.visitAnyway;
    if (navItemVisitable) return this.router.navigate(this.navigation.getUrlsArray(item));

    if (item.children) {
      this.data.toggle = !this.data.toggle;
      this.cdr.detectChanges();
    }

    const navItemIsLast = item.url && !item.children;
    if (navItemIsLast) {
      this.router.navigate(this.navigation.getUrlsArray(item));
    }
  }
}
