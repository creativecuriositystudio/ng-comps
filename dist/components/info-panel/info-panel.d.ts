import { OnInit } from '@angular/core';
/** Provide an accordion component */
export declare class InfoPanelComponent implements OnInit {
    /** Class of the panel theme color */
    theme: string;
    /** The class of the panel body */
    class: string;
    /** If it is collapsed */
    isCollapsed: any;
    constructor();
    /** If no icons are provided, set a default set */
    ngOnInit(): void;
}
