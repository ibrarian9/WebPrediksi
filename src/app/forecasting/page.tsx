"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useEffect, useState} from "react";
import forecastData from "@/app/api/forecastData";
import rumusData from "@/app/api/rumusData";
import {TrashIcon} from "@heroicons/react/24/outline";

interface rumusData {
    lamda: number,
    lamda2: number
}

interface Product {
    date: string
    production: number;
}

const Forecasting = () => {

    const [productData, setProductData] = useState<Product[]>([])
    const [rumus, setRumus] = useState<rumusData>({lamda: 0, lamda2: 0})

    useEffect(() => {
        Promise.all([forecastData(), rumusData()]).then(([forecastResult, rumusResult]) => {
            setProductData(forecastResult)
            setRumus(rumusResult)
        })
    }, []);

    const production: number[] = productData.map((item: Product) => item.production)
    const date: string[] = productData.map((item: Product) => item.date)

    const lamda: number = rumus.lamda;
    const lamda2: number = rumus.lamda2;

    const ForecastingData: { date: string; production: number; lf: number; tf: number }[] = [];

    let lf: number = production[0];
    let tf: number = production[0];

    // First Data
    ForecastingData.push({date: date[0], production: production[0], lf: lf, tf: tf})

    // After First Data
    for (let i: number = 1; i < production.length; i++) {
        let newLf: number = lamda * production[i] + (1 - lamda) * (lf + tf);
        let newTf: number = lamda2 * (newLf - lf) + (1 - lamda2) * tf;

        lf = newLf;
        tf = newTf;

        ForecastingData.push({date: date[i], production: production[i], lf, tf});
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Forecasting"/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"flex justify-between mx-20 my-5"}>
                        <Link className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} href={"/forecasting/rumus"}>
                            Edit Rumus
                        </Link>
                        <Link className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} href={"/forecasting/tambah"}>
                            Tambah Data
                        </Link>
                    </div>
                    <div className={"mx-20"}>
                        <table className={"w-full table-auto"}>
                            <thead>
                            <tr className="bg-gray-2 text-center dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Date
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Production
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Level Formula
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Trend Formula
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {ForecastingData.map((item, key) => (
                                <tr key={key} className={"border-2"}>
                                    <td className={"border-2 p-2"}>{item.date}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.production?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.lf?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.tf?.toFixed(3))}</td>
                                    <td className={"border-2 p-2 text-center "}>
                                        <button className="hover:text-danger">
                                            <TrashIcon className={"size-[20px]"}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DefaultLayout>

        </>
    )
}

export default Forecasting