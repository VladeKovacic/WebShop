export interface ProductGroupTree {
    id: number;
    name: string;
    subProductGroups: ProductGroupTree[];
}