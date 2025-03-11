// Define types for the nested structures
type Price = {
    id: number;
    label: string;
    value: number;
    processId: number;
};

// type ProcessItem = {
//     id: number;
//     label: string;
//     value: number;
//     processId: number;
//     additionalPrice: number;
// };

export type Step = {
    id: number;
    label: string;
    min_choice: number | null;
    max_choice: number | null;
    items: Item[];
};

export type Process = {
    id: number;
    label: string;
    steps: Step[];
};

// Main Item type
export type Item = {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    allergens: string[];
    prices: Price[];
    processes?: Process;
};