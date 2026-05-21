export interface Vehicle {
    id?: number;
    
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    color: string;

    description: string;
    sellerName: string;
    sellerPhone: string;
    sellerLocation: string;
    
    imageUrl: string;

    createdAt?: Date;
    updatedAt?: Date;
}