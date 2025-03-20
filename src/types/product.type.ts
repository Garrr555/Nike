export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    age?: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
    stock: [
        {
            size: string;
            qty: number;
        },
    ]
}