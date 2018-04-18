/** Helper class for saving the number of items to be listed as per user's preference */
export class PaginationHelper {
  /** The localStorage key for saving items per page selected */
  public static itemsPerPage = 'macrotrack:itemsperpage';

  /** Save the number selected by the user */
  public static setItemsPerPage(count: number) {
    localStorage.setItem(PaginationHelper.itemsPerPage, count.toString());
  }

  /** Retrieve the number of items the user previously selected */
  public static getItemsPerPage(): number {
    return +localStorage.getItem(PaginationHelper.itemsPerPage);
  }
}
