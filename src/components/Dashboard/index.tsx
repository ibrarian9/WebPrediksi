"use client"

import {ChartBarIcon, UserCircleIcon, ChartPieIcon} from "@heroicons/react/24/outline";
import useStoreItem from "@/app/stores/useStoreItem";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import React, {useState} from "react";
import Cookies from "js-cookie";

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
        categories: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ],
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
        min: 0,
        max: 100000,
    },
}

interface ChartOneState {
    series: {
        name: string
        data: number[]
    }[]
}

const Dashboard: React.FC = () => {

    const jumlahUsers = Cookies.get("jumlahUser")
    const jumlahDataAktual = Cookies.get("jumlahData")
    const jumlahDataProduct = Cookies.get("products")
    const {items} = useStoreItem()

    const [state, setState] = useState<ChartOneState>({
        series: [
            {
                name: "Data Actual Forecast",
                data: items,
            },
        ],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
        }));
    };
    handleReset;

    return (
        <>
            <div className="pb-6 grid grid-cols-3 gap-4 place-content-center">
                <div className="h-fit flex p-2 bg-white rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <ChartBarIcon className="size-16 border-2 border-black bg-green-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Data Actual</h1>
                        <h5 className="">{jumlahDataAktual}</h5>
                    </div>
                </div>
                <div className="h-fit flex p-2 bg-white rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <UserCircleIcon className="size-16 border-2 bg-rose-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Users</h1>
                        <h5 className="">{jumlahUsers}</h5>
                    </div>
                </div>
                <div className="h-fit flex p-2 bg-white rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <ChartPieIcon className="size-16 border-2 bg-yellow-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Production</h1>
                        <h5 className="">{jumlahDataProduct}</h5>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-white min-h-fit rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark p-10">
                <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                    <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                        <div className="flex min-w-47.5">
                            <span
                                className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                            </span>
                            <div className="w-full">
                                <p className="font-semibold text-primary">Data Actual Forecast</p>
                                <p className="text-sm font-medium"></p>
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
        </>
    )
}

export default Dashboard
