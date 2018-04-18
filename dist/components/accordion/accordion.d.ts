import { OnInit } from '@angular/core';
/** Interface for providing togglable icons */
export interface ToggleIcon {
    show: string;
    hide: string;
}
/** Provide an accordion component */
export declare class AccordionComponent implements OnInit {
    /** Title of the accordion */
    title: string;
    /** Whether the accordion is toggled */
    isCollapsed: boolean;
    /** Togglable font-awesone icon strings provided as per ToggleIcon interface */
    icons?: ToggleIcon;
    constructor();
    /** If no icons are provided, set a default set */
    ngOnInit(): void;
}
