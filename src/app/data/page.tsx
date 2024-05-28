"use client"

import Link from "next/link";
import Swal from "sweetalert2";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Pagination} from "@nextui-org/pagination";
import React, {useMemo, useState} from "react";
import dataActual from "@/app/lib/dataActual";
import useStoreItem from "@/app/stores/useStoreItem";

async function deleteDataActual(id: number) {

    const response = await fetch(`${process.env.API_URL}/dataActual/${id}`, {
        method: "DELETE"
    })

    return await response.json()
}

const Data: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const {forecasts, setForecast, setData} = useStoreItem()
    const itemPerPage: number = 5

    // Pagination
    const totalPages = useMemo(() => Math.ceil(forecasts.length / itemPerPage),
        [forecasts])

    // Data after pagination
    const currentData = useMemo(() => {
        const lastIndex = currentPage * itemPerPage
        const firstIndex = lastIndex - itemPerPage
        return forecasts.slice(firstIndex, lastIndex)
    }, [currentPage, forecasts, itemPerPage])

    // Handle Button
    const handlePage = (page: number) => {
        setCurrentPage(page)
    }

    // Delete
    const deleteData = (id: number) => {
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
                const response = await deleteDataActual(id)
                if (response.httpStatus === 200) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Berhasil",
                        text: "Delete Data Berhasil",
                        showConfirmButton: true
                    })
                    const newData = await dataActual()
                    setData(newData.data)
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

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Aktual"/>
                <div className="overflow-hidden bg-white h-fit rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark py-10">
                    <div className={"flex justify-end mx-20 mb-5"}>
                        <Link className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} href={"/data/tambah"}>
                            Tambah Data
                        </Link>
                    </div>
                    <div className={"mx-20"}>
                        <table className={"w-full table-auto"}>
                            <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center border-2">
                                    Waktu
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center border-2">
                                    Month
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center border-2">
                                    Laju Produksi
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center border-2">
                                    Forecast
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center border-2">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentData?.map((item) => (
                                <tr key={item.id} className={"border-2"}>
                                    <td className={"border-2 p-2"}>{item.date}</td>
                                    <td className={"border-2 p-2"}>{item.month}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.lajuProduksi?.toFixed(3))}</td>
                                    <td className={"border-2 p-2"}>{parseFloat(item.forecast?.toFixed(3))}</td>
                                    <td className={"border-2 p-2 text-center"}>
                                        <button>
                                            <Link className="hover:text-green-500" href={`/data/edit/${item.id}`}>
                                                <PencilSquareIcon className={"size-[20px]"}/>
                                            </Link>
                                        </button>
                                        <button className="hover:text-danger mx-2" onClick={() => deleteData(item.id)}>
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
                                onChange={handlePage}
                                page={currentPage}
                                variant={"bordered"}/>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Data