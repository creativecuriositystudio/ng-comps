/** Provide an accordion component */
export declare class PanelComponent {
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
    /** Class of the panel theme color */
    theme: string;
    /** Extra class for panel */
    class: string;
    constructor();
}
