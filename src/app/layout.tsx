"use client"

import "./globals.css";
import React, {useEffect, useMemo, useState} from "react";
import Loader from "@/components/common/Loader";
import useStoreItem from "@/app/stores/useStoreItem";
import dataActual from "@/app/lib/dataActual";
import forecastAllData from "@/app/lib/forecastAllData";
import useForecastItem from "@/app/stores/useForecastItem";
import rumusData from "@/app/lib/rumusData";
import monthData from "@/app/lib/monthData";

interface Forecast {
    id: number;
    date: string;
    month: number;
    lajuProduksi: number;
    forecast: number;
}

interface Forecastings {
    id: number;
    date: string;
    production: number;
    lf: number;
    tf: number
}

interface Equation {
    id: number;
    month: number;
    forecast: number;
}

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {

    const {setForecast, setItem, setData, data} = useStoreItem()
    const {setProducts, products, setForecastEq, setEquation, setMonth, month, rumus, setRumus} = useForecastItem()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        Promise.all([dataActual(), forecastAllData(), rumusData(), monthData()])
            .then(([dataResult, productResult, rumusResult, monthResult]) => {
                setData(dataResult.data);
                setProducts(productResult.data);
                setRumus(rumusResult.data);
                setMonth(monthResult.data);
            })
    }, []);

    useMemo(() => {
        if (data.length === 0) return []

        const dataForecast: Forecast[] = [];
        const decayRate: number = -0.02;
        let forecastValue: number = data[0].lajuProduksi;

        dataForecast.push({
            ...data[0],
            forecast: forecastValue,
        });

        for (let i: number = 1; i < data.length; i++) {
            forecastValue = data[i - 1].lajuProduksi * Math.exp(decayRate);
            dataForecast.push({
                ...data[i],
                forecast: forecastValue,
            });
        }

        setForecast(dataForecast);
        setItem(dataForecast.map((item) => parseFloat(item.forecast?.toFixed(3))));
        return dataForecast
    }, [data]);

    const formula = useMemo(() => {
        if (products.length === 0) return []

        const {lamda, lamda2} = rumus

        const Formula: Forecastings[] = []

        let lf = 0;
        let tf = 0;

        Formula.push({
            id: products[0].id,
            date: products[0].date,
            production: products[0].production,
            lf: lf,
            tf: tf,
        })

        if (products.length > 1) {
            const lf2 = products[1].production
            const tf2 = products[0].production - lf2

            Formula.push({
                id: products[1].id,
                date: products[1].date,
                production: products[1].production,
                lf: lf2,
                tf: tf2,
            })

            lf = lf2
            tf = tf2
        }

        for (let i = 2; i < products.length; i++) {
            const {id, production, date} = products[i];
            const newLf = lamda * production + (1 - lamda) * (lf + tf);
            const newTf = lamda2 * (newLf - lf) + (1 - lamda2) * tf;

            lf = newLf;
            tf = newTf;

            Formula.push({id, date, production, lf, tf});
        }

        setForecastEq(Formula)
        return Formula
    }, [products, rumus])

    useMemo(() => {
        if (formula.length === 0) return []

        const data: Equation[] = []

        for (let i = 0; i < formula.length - 1; i++) {
            const lastForecast = formula[i + 1]
            const forecast = lastForecast?.lf + lastForecast?.tf

            data.push({
                id: i + 1,
                month: i + 1,
                forecast: forecast,
            })
        }

        setEquation(data)
        return data
    }, [formula, month]);

    return (
        <html lang="en">
        <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader/> : children}
        </div>
        </body>
        </html>
    );
}
