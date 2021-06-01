export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    isOnSale?: boolean;
    salePercentage?: number;
    productGroupId: number;
}