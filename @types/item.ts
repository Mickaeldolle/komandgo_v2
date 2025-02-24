// Define types for the nested structures
type Price = {
    id: number;
    label: string;
    value: number;
    processId: number;
};

type ProcessItem = {
    id: number;
    label: string;
    value: number;
    processId: number;
    additionalPrice: number;
};

type ProcessStep = {
    id: number;
    label: string;
    allowMultiple: boolean;
    items: ProcessItem[];
};

type Process = {
    id: number;
    label: string;
    steps: ProcessStep[];
};

// Main Item type
export type Item = {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    allergens: string[];
    prices: Price[];
    processes?: Process;
};