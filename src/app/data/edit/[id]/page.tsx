"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import useStoreItem from "@/app/stores/useStoreItem";
import dataActual from "@/app/lib/dataActual";

export async function detailDataActual(id: number) {

    const response = await fetch(`${process.env.API_URL}/dataActual/${id}`)

    return await response.json()
}

async function editDataActual(formData: any, id: number) {

    const response = await fetch(`${process.env.API_URL}/dataActual/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    return await response.json()
}


const EditData = ({params}: any) => {

    const {setData} = useStoreItem()
    const router = useRouter()
    const [form, setForm] = useState({
        date: "",
        month: 0,
        lajuProduksi: 0
    })

    useEffect(() => {
        Promise.all([detailDataActual(params.id)])
            .then(([detailResult]) => {
                setForm(detailResult.data)
            })
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const result = await editDataActual(form, params.id)
        if (result.httpStatus === 200) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil",
                text: "Data Actual Berhasil Di Update",
                showConfirmButton: true
            })
            const newdata = await dataActual()
            setData(newdata.data)
            router.push("/data")
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal",
                text: "Data Actual Gagal Di Update",
                showConfirmButton: true
            })
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Edit Data Aktual"}/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border flex justify-center
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"w-4/5 h-fit"}>
                        <div className={"flex justify-end pt-5"}>
                            <Link className={"py-2 px-3 bg-yellow-400 text-black-2 hover:bg-yellow-500 rounded-xl"}
                                  href={"/data"}>
                                Kembali
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Waktu</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"date"}
                                       type={"date"}
                                       value={form.date}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Waktu"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Month</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"month"}
                                       type={"number"}
                                       max={99}
                                       value={form.month}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Bulan"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Laju Produksi</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"lajuProduksi"}
                                       type={"number"}
                                       step={"0.001"}
                                       value={form.lajuProduksi}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Laju Produksi"} required={true}/>
                            </div>
                            <div className={"flex justify-start py-2.5"}>
                                <button className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} type={"submit"}>
                                    Edit Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default EditData