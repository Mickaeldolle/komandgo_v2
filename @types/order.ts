interface TCartItem {
    id: number;
    quantity: number;
    price: number;
    name: string;
    imageUrl?: string;
    steps?: TStep[];
}

interface TCart {
    id: number;
    items: TCartItem[];
    total: number;
    createdAt: string;
    updatedAt?: string;
}

interface TOrder {
    id: number;
    cart: TCart;
    total: number;
    status: 'waiting' | 'confirmed' | 'processing' | 'ready' | 'canceled' | 'delivered';
    createdAt: string;
    updatedAt?: string;
    deliveredAt?: string;
}
