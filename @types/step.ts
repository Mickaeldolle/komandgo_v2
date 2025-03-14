interface TStep {
    id: number;
    name: string;
    items?: TStepItem[];
}

interface TStepItem {
    id: number;
    name: string;
    additionalPrice: number;
}