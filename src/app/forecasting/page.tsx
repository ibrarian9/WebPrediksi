"use client"

import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Pagination} from "@nextui-org/pagination";
import Swal from "sweetalert2";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, {useEffect, useMemo, useState} from "react";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import forecastAllData from "@/app/lib/forecastAllData";
import useForecastItem from "@/app/stores/useForecastItem";

interface Chart {
    series: {
        name: string
        data: number[]
    }[]
}

interface MergeData {
    id: number,
    date: string,
    production: number,
    lf: number,
    tf: number,
    month: number,
    forecast: number
}

function genapkanKeSeribuan(num: number): number {
    return Math.ceil(num / 1000) * 1000
}

export async function deleteProduct(id: number) {

    const response = await fetch(`${process.env.API_URL}/forecast/product/${id}`, {
        method: "DELETE"
    })

    return await response.json()
}

const Forecasting: React.FC = () => {

    const itemPerPage: number = 5
    const {forecastEq, equation, setProducts} = useForecastItem()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [jumlahData, setJumlahData] = useState<number[]>([])
    const [state, setState] = useState<Chart>({
        series: [
            {
                name: "Forecast",
                data: []
            }
        ]
    })

    // Total Production
    const sumForecast = forecastEq.reduce((sum, forecast) => {
        return sum + forecast.production
    }, 0)

    // Total Forecast
    const sumEquation = equation.reduce((sum, equation) => {
        return sum + equation.forecast
    }, 0)

    // EUR
    const Eur = sumForecast + sumEquation
    // RR
    const RR = Eur - sumForecast

    const mergeData: MergeData[] = forecastEq.map((item, id): MergeData => {
        const coreIndex = id - 2
        const monthIndex = id + 1
        const coreEquation = equation.find((_d, index) => index === coreIndex)

        return coreEquation ?
            {...item, ...coreEquation, month: monthIndex} :
            {...item, month: monthIndex} as MergeData
    })

    // Pagination
    const totalPages = useMemo(() => Math.ceil(forecastEq.length / itemPerPage)
        , [forecastEq])

    // Merged Data after Pagination
    const mergedData: MergeData[] = useMemo(() => {
        const lastIndex = currentPage * itemPerPage
        const firstIndex = lastIndex - itemPerPage
        return mergeData.slice(firstIndex, lastIndex)
    }, [currentPage, mergeData])

    // Last Month
    const lastItem = useMemo(() => {
        return equation[equation.length - 1]
    }, [equation])

    // pagination
    useMemo(() => Math.ceil(equation.length / itemPerPage)
        , [equation]);

    useEffect(() => {
        const dataForecast = equation.map((item) => parseFloat(item?.forecast?.toFixed(3)))
        setState(prevState => ({
            ...prevState,
            series: [
                {
                    ...prevState.series[0],
                    data: dataForecast
                }
            ]
        }))
    }, [equation]);

    useMemo(() => {
        let data: number[] = []
        for (let i = 1; i <= equation.length; i++) {
            data.push(i)
        }
        setJumlahData(data)
    }, [equation.length]);

    const maxEquation = genapkanKeSeribuan(Math.max(...equation.map(item => item.forecast)))
    const minEquation = genapkanKeSeribuan(Math.min(...equation.map(item => item.forecast)))

    const options: ApexOptions = {
        legend: {
            show: false,
            position: "top",
            horizontalAlign: "left",
        },
        colors: ["#3C50E0", "#80CAEE"],
        chart: {
            height: 335,
            type: "area",
            dropShadow: {
                enabled: true,
                color: "#623CEA14",
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },

            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        height: 300,
                    },
                },
            },
            {
                breakpoint: 1366,
                options: {
                    chart: {
                        height: 350,
                    },
                },
            },
        ],
        stroke: {
            width: [2, 2],
            curve: "straight",
        },

        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: "#fff",
            strokeColors: ["#3056D3", "#80CAEE"],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
                size: undefined,
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: "category",
            categories: jumlahData,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: "0px",
                },
            },
            min: minEquation - 2000,
            max: maxEquation + 2000,
        },
    }

    // Handling Pagination
    const handlePagination = (page: number) => {
        setCurrentPage(page)
    }

    // Delete Product
    const deleteHandle = (id: number) => {
        Swal.fire({
            title: "Delete",
            text: "Are you sure to Delete this ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteProduct(id)
                if (response.httpStatus === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Berhasil",
                        text: "Delete Data Berhasil",
                        showConfirmButton: true
                    })
                    const newData = await forecastAllData()
                    setProducts(newData.data)
                } else {
                    await Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Gagal",
                        text: "Delete Data Gagal",
                        showConfirmButton: true
                    })
                }
            }
        })
    }

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
        }));
    };
    handleReset;

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Forecasting"/>
                <div className="overflow-hidden bg-white h-fit rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark py-10">
                    <div className={"flex justify-between mx-20 mb-5"}>
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
                                    Month
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Forecast
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white border-2">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {mergedData.map((item, key) => (
                                <tr key={key} className={"border-2"}>
                                    <td className={"border-2 p-2"}>{item?.date}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.production?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.lf?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.tf?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{item?.month}</td>
                                    <td className={"border-2 p-2"}>{item?.forecast !== undefined && item?.forecast !== null ? parseFloat(item.forecast.toFixed(3)) : 0}</td>
                                    <td className={"border-2 p-2 text-center"}>
                                        <button>
                                            <Link className="hover:text-green-500"
                                                  href={`/forecasting/edit/${item.id}`}>
                                                <PencilSquareIcon className={"size-[20px]"}/>
                                            </Link>
                                        </button>
                                        <button className="hover:text-danger mx-2"
                                                onClick={() => deleteHandle(item.id)}>
                                            <TrashIcon className={"size-[20px]"}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className={"flex flex-wrap gap-4 items-center py-4"}>
                            <Pagination
                                total={totalPages}
                                initialPage={1}
                                onChange={handlePagination}
                                page={currentPage}
                                variant={"bordered"}/>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden bg-white min-h-fit rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark p-10 mt-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                            <div className="flex min-w-47.5">
                            <span
                                className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                            </span>
                                <div className="w-56">
                                    <p className="font-semibold text-primary">Total Forecast</p>
                                    {lastItem && (
                                        <p
                                            className="text-sm font-medium">
                                            Forecasting pada Bulan 1 - {equation.length}</p>
                                    )}
                                </div>
                                <div className="flex w-56">
                                     <span
                                         className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                        <span
                                            className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                                     </span>
                                    <div className="flex-col">
                                        <p className="font-semibold text-primary">Np</p>
                                        <p className="text-sm font-medium">{parseFloat(sumForecast.toFixed(3))}</p>
                                    </div>
                                </div>
                                <div className="flex w-56">
                                       <span
                                           className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                        <span
                                            className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                                     </span>
                                    <div className="flex-col">
                                        <p className="font-semibold text-primary">Np Limit</p>
                                        <p className="font-sm font-medium">{parseFloat(sumEquation.toFixed(3))}</p>
                                    </div>
                                </div>
                                <div className="flex w-56">
                                     <span
                                         className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                        <span
                                            className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                                     </span>
                                    <div className="flex-col">
                                        <p className="font-semibold text-primary">EUR</p>
                                        <p className="font-sm font-medium">{parseFloat(Eur.toFixed(3))}</p>
                                    </div>
                                </div>
                                <div className="flex w-56">
                                     <span
                                         className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                        <span
                                            className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                                     </span>
                                    <div className="flex-col">
                                        <p className="font-semibold text-primary">RR</p>
                                        <p className="font-sm font-medium">{parseFloat(RR.toFixed(3))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div id="chartOne" className="-ml-5">
                            <ReactApexChart
                                options={options}
                                series={state.series}
                                type="area"
                                height={350}
                                width={"100%"}
                            />
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Forecasting