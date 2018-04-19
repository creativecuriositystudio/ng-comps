import { OnInit } from '@angular/core';
/** Provide an accordion component */
export declare class PageHeaderComponent implements OnInit {
    /** Title of the accordion */
    title: string;
    /** Whether the panel is collapsable */
    collapsable: boolean;
    /** Whether the accordion is toggled */
    isCollapsed: boolean;
    /** Text next to the collapse symbol */
    collapseText: string;
    /** The alignment of the panel title using bootstrap class */
    alignment: string;
    /** Class of the panel background color */
    background: 'primary' | 'secondary' | 'tertiary' | 'quarternary';
    /** Class to define the height of the card if neccessary - currently being used for premium-cards */
    specificStyle: string;
    /** If no icons are provided, set a default set */
    ngOnInit(): void;
}
