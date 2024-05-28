"use client"

import Link from "next/link";
import {useState} from "react";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import AddMonth from "@/app/lib/addMonth";
import MonthData from "@/app/lib/monthData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useForecastItem from "@/app/stores/useForecastItem";

const TambahMonth = () => {

    const router = useRouter()
    const [formData, setForm] = useState({month: 0})
    const {setMonth} = useForecastItem()

    const handleChange = (e: any) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()

        const result = await AddMonth(formData)
        if (result) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil",
                text: "Bulan Berhasil Ditambah",
                showConfirmButton: true
            })
            const newData = await MonthData()
            setMonth(newData.data)
            router.push("/forecasting")
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal",
                text: "Bulan Gagal Ditambah",
                showConfirmButton: true
            })
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Tambah Data Forecasting"}/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border flex justify-center
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"w-4/5 h-fit"}>
                        <div className={"flex justify-end pt-5"}>
                            <Link className={"py-2 px-3 bg-yellow-400 text-black-2 hover:bg-yellow-500 rounded-xl"}
                                  href={"/forecasting"}>
                                Kembali
                            </Link>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Bulan</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"month"}
                                       type={"number"}
                                       max={99}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Bulan"} required={true}/>
                            </div>
                            <div className={"flex justify-start py-2.5"}>
                                <button
                                    className={"py-2 px-3 bg-blue-700 text-white rounded-xl"}
                                    type={"submit"}>
                                    Tambah Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default TambahMonth