export class ProductParams {
    searchString: string;
    pageNumber = 1;
    pageSize = 5;
    sortColumn?: string;
    sortDirection?: SortDirection;
}

export type SortDirection = 'asc' | 'desc';