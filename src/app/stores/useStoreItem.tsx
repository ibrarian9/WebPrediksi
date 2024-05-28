import {create} from "zustand";

interface Forecast {
    id: number;
    date: string;
    month: number;
    lajuProduksi: number;
    forecast: number;
}

interface DataActuals {
    id: number;
    date: string;
    month: number;
    lajuProduksi: number;
}

interface StoreItem {
    forecasts: Forecast[]
    setForecast: (forecasts: Forecast[]) => void
    setItem: (items: number[]) => void
    items: number[]
    data: DataActuals[]
    setData: (dataActuals: DataActuals[]) => void
}

const useStoreItem = create<StoreItem>((set) => ({
    forecasts: [],
    items: [],
    data: [],
    setForecast: forecasts => set(() => ({forecasts})),
    setItem: items => set(() => ({items})),
    setData: dataActuals => set(() => ({data: dataActuals})),
}))

export default useStoreItem