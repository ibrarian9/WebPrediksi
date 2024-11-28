"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import forecastAllData from "@/app/lib/forecastAllData";
import totalForecast from "@/app/lib/jumlahForecast"
import setJumlahForecast from "@/app/lib/setJumlahForecast";
import useForecastItem from "@/app/stores/useForecastItem";

const JumlahForecast = () => {

    const router = useRouter()
    const {setProducts, setTotalForecast} = useForecastItem()
    const [formData, setFormData] = useState({
        jumlahForecast: 0
    })

    useEffect(() => {
        const fetchRumus = async () => {
            const result = await totalForecast()
            if (result.httpStatus === 200) {
                setFormData({
                    jumlahForecast: result.data.jumlahForecast
                })
            }
        }
        fetchRumus()
    }, []);


    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()

        const result = await setJumlahForecast(formData)
        if (result.httpStatus === 200) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil",
                text: " Jumlah Forecast Berhasil Diubah",
                showConfirmButton: true
            })
            const newProduct = await forecastAllData()
            setProducts(newProduct.data)
            const newData = await totalForecast()
            setTotalForecast(newData.data)
            router.push("/forecasting")
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal",
                text: "Jumlah Forecast Gagal Diubah",
                showConfirmButton: true
            })
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Jumlah Forecast"}/>
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
                                <h5 className={"text-black-2 font-extrabold"}>Jumlah Forecast</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"jumlahForecast"}
                                       type={"number"}
                                       value={formData.jumlahForecast}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Jumlah Forecast"} required={true}/>
                            </div>
                            <div className={"flex justify-start py-2.5"}>
                                <button
                                    className={"py-2 px-3 bg-blue-700 text-white rounded-xl"}
                                    type={"submit"}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default JumlahForecast