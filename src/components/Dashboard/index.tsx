"use client"

import {ChartBarIcon, UserCircleIcon, ChartPieIcon} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

const Dashboard = () => {

    const jumlahUsers = Cookies.get("userCount")

    return (
        <>
            <div className="py-6 grid grid-cols-3 gap-4 place-content-center">
                <div className="h-fit flex p-2 bg-white">
                    <ChartBarIcon className="size-16 border-2 border-black bg-green-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Data Actual</h1>
                        <h5 className="">0</h5>
                    </div>
                </div>
                <div className="h-fit flex p-2 bg-white">
                    <UserCircleIcon className="size-16 border-2 bg-rose-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Users</h1>
                        <h5 className="">{jumlahUsers}</h5>
                    </div>
                </div>
                <div className="h-fit flex p-2 bg-white">
                    <ChartPieIcon className="size-16 border-2 bg-yellow-500 text-black-2"/>
                    <div className="flex-col py-2 px-4">
                        <h1 className="">Visitors</h1>
                        <h5 className="">0</h5>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden bg-white min-h-screen rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">

            </div>
        </>
    )
}

export default Dashboard
