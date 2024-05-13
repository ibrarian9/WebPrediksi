"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {TrashIcon} from "@heroicons/react/24/outline";
import userData from "@/app/api/userData";
import {useEffect, useState} from "react";

const Akun = () => {

    const [data, setData] = useState<any>()

    useEffect(() => {
        userData().then(
            data => {
                return setData(data);
            }
        ).catch(err => {
            console.error("failed to fetch : ", err)
        })
    }, []);

    console.table(data)

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Akun"}/>
                <div
                    className="overflow-hidden bg-white min-h-screen rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-10 h-fit">
                        <table className={"w-full table-auto"}>
                            <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-center">
                                    Name
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Email
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Username
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((item: any, key: number) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 border-2">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {item.nama}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark border-2">
                                        <p className="text-black dark:text-white">
                                            {item.email}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark border-2">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium`}>
                                            {item.username}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark border-2">
                                        <div className="flex items-center space-x-3.5 justify-center">
                                            <button className="hover:text-danger">
                                                <TrashIcon className={"size-[20px]"}/>
                                            </button>
                                        </div>
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

export default Akun