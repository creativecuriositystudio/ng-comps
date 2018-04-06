/** Helper class for saving the number of items to be listed as per user's preference */
export declare class PaginationHelper {
    /** The localStorage key for saving items per page selected */
    static itemsPerPage: string;
    /** Save the number selected by the user */
    static setItemsPerPage(count: number): void;
    /** Retrieve the number of items the user previously selected */
    static getItemsPerPage(): number;
}
