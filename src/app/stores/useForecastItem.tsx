import {create} from "zustand";

interface Product {
    id: number;
    date: string;
    production: number;
}

interface Forecastings {
    id: number;
    date: string;
    production: number;
    lf: number;
    tf: number
}

interface ForecastingEquation {
    id: number;
    month: number;
    forecast: number;
}

interface Month {
    id: number;
    month: number;
}

interface Rumus {
    lamda: number;
    lamda2: number;
}

interface storeItem {
    products: Product[];
    setProducts: (products: Product[]) => void;
    forecastEq: Forecastings[];
    setForecastEq: (forecastEq: Forecastings[]) => void;
    equation: ForecastingEquation[];
    setEquation: (equation: ForecastingEquation[]) => void;
    month: Month[];
    setMonth: (month: Month[]) => void;
    rumus: Rumus;
    setRumus: (rumus: Rumus) => void;
}

const useForecastItem = create<storeItem>((set) => ({
    products: [],
    forecastEq: [],
    equation: [],
    month: [],
    rumus: {lamda: 0, lamda2: 0},
    setRumus: rumus => set({rumus}),
    setProducts: products => set(() => ({products})),
    setForecastEq: forecastEq => set(() => ({forecastEq})),
    setEquation: equation => set(() => ({equation})),
    setMonth: month => set(() => ({month})),
}))

export default useForecastItem