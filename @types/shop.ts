export type Shop = {
    id: number;
    name: string;
    open: boolean;
    cuisine: string[];
    address: {
        street: string;
        city: string;
        postcode: string;
        label: string;
    };
    phone: string;
    website: string;
    rating: number; // Rating sur 5, par exemple 4.8
    price_range: "$" | "$$" | "$$$" | "$$$$"; // Indique la gamme de prix
    features: string[]; // Liste de fonctionnalités comme "Terrasse", "Livraison", etc.
    hours: {
        id: number;
        day: number;
        open: string; // Peut être typé comme `Date` si vous gérez les dates sous forme d'objet Date
        close: string;   // Idem pour `Date`
        delivery: boolean;
        clickAndCollect: boolean;
        onSite: boolean;
        shopUuid: string;
    }[];
};