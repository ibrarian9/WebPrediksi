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
import getAllForecast from "@/app/lib/jumlahForecast";

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
    t: number
    b: number
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
    const {
        setProducts,
        products,
        setForecastEq,
        setEquation,
        setMonth,
        month,
        rumus,
        setRumus,
        totalForecast,
        setTotalForecast
    } = useForecastItem()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        Promise.all([dataActual(), forecastAllData(), rumusData(), monthData(), getAllForecast()])
            .then(([dataResult, productResult, rumusResult, monthResult, jumlahResult]) => {
                setData(dataResult.data);
                setProducts(productResult.data);
                setRumus(rumusResult.data);
                setMonth(monthResult.data);
                setTotalForecast(jumlahResult.data)
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

        let initLf = products[0].production;
        let initTf = products[0].production;
        let initT = products[0].production;
        let initB = 0;

        Formula.push({
            id: products[0].id,
            date: products[0].date,
            production: products[0].production,
            lf: initLf,
            tf: initTf,
            t: initT,
            b: initB
        })

        const panjangData = products.length + totalForecast.jumlahForecast

        for (let i = 2; i < panjangData; i++) {
            const {id, date} = products[i] ?? 0;
            const production = products[i - 1]?.production ?? 0;
            const newLf = (lamda * production) + (lamda2 * initLf);
            const newTf = (lamda * newLf) + (lamda2 * initT);
            const newT = (2 * newLf) - newTf
            const newB = (lamda / lamda2) * (newTf - newT)

            initLf = newLf;
            initTf = newTf;
            initT = newT
            initB = newB

            Formula.push({id: id, date: date, production: production, lf: initLf, tf: initTf, t: initT, b: initB});
        }

        setForecastEq(Formula)
        return Formula
    }, [products, rumus, totalForecast.jumlahForecast])

    useMemo(() => {
        if (formula.length === 0) return []

        const data: Equation[] = []

        let mountCount = 1

        for (let i = products.length; i < formula.length; i++) {
            const lastForecast = formula[i]
            const forecast = lastForecast?.t + lastForecast?.b

            data.push({
                id: i + 1,
                month: mountCount++,
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
