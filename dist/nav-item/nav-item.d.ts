import { OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem, NavigationService } from '../../../../services/navigation';
/** Provides a nav item that works recursively for sub-nav */
export declare class NavItemComponent implements OnInit, OnChanges {
    private router;
    private cdr;
    private navigation;
    /** Navigation items data */
    data: NavItem;
    /** Constructs this component */
    constructor(router: Router, cdr: ChangeDetectorRef, navigation: NavigationService);
    /** Whether the url is active */
    readonly isUrlActive: boolean;
    /** Initializes this component */
    ngOnInit(): void;
    /** Triggers change when there's an update on the nav item data */
    ngOnChanges(): void;
    /** Initalizes the nav items and set their each item parent accordingly */
    initNavItems(): void;
    /** Go to the URL of that nav item or toggle sub-nav */
    goto(item: NavItem): Promise<boolean>;
}
