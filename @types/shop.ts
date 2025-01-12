export type Shop = {
    id: number;
    name: string;
    cuisine: string;
    address: {
        street: string;
        city: string;
        postcode: string;
    };
    phone: string;
    website: string;
    rating: number; // Rating sur 5, par exemple 4.8
    price_range: "$" | "$$" | "$$$" | "$$$$"; // Indique la gamme de prix
    features: string[]; // Liste de fonctionnalités comme "Terrasse", "Livraison", etc.
    hours: {
        monday?: string; // Les horaires d'ouverture par jour (facultatif si fermé)
        tuesday?: string;
        wednesday?: string;
        thursday?: string;
        friday?: string;
        saturday?: string;
        sunday?: string;
    };
};
