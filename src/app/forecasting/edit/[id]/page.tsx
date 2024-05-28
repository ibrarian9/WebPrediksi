"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import useForecastItem from "@/app/stores/useForecastItem";
import ForecastAllData from "@/app/lib/forecastAllData";

export async function detailForecast(id: number) {

    const response = await fetch(`${process.env.API_URL}/forecast/product/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch Data")
    }

    return await response.json()
}

export async function editForecast(formData: any, id: number) {

    const response = await fetch(`${process.env.API_URL}/forecast/product/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    return await response.json()
}


const EditForecasting = ({params}: any) => {

    const router = useRouter()
    const {setProducts} = useForecastItem()
    const [formData, setForm] = useState({
        date: "",
        production: ""
    })

    useEffect(() => {
        Promise.all([detailForecast(params.id)])
            .then(([detailResult]) => {
                setForm(detailResult.data)
            })
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()

        const result = await editForecast(formData, params.id)
        if (result.httpStatus === 200) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil",
                text: "Data Produksi Berhasil Di Ubah",
                showConfirmButton: true
            })
            const newData = await ForecastAllData();
            setProducts(newData.data)
            router.push("/forecasting")
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal",
                text: "Data Produksi Gagal Di Ubah",
                showConfirmButton: true
            })
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Edit Data Forecasting"}/>
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
                                <h5 className={"text-black-2 font-extrabold"}>Tanggal</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"date"}
                                       type={"date"}
                                       value={formData.date}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Tanggal"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Production</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"production"}
                                       type={"number"}
                                       step={"0.001"}
                                       value={formData.production}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Jumlah Produksi"} required={true}/>
                            </div>
                            <div className={"flex justify-start py-2.5"}>
                                <button
                                    className={"py-2 px-3 bg-blue-700 text-white rounded-xl"}
                                    type={"submit"}>
                                    Submit Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default EditForecasting