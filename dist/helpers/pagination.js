"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Helper class for saving the number of items to be listed as per user's preference */
class PaginationHelper {
    /** Save the number selected by the user */
    static setItemsPerPage(count) {
        window.localStorage.setItem(PaginationHelper.itemsPerPage, count.toString());
    }
    /** Retrieve the number of items the user previously selected */
    static getItemsPerPage() {
        return +window.localStorage.getItem(PaginationHelper.itemsPerPage);
    }
}
/** The localStorage key for saving items per page selected */
PaginationHelper.itemsPerPage = 'macrotrack:itemsperpage';
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=pagination.js.map