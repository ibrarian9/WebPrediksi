"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import TambahProduction from "@/app/api/tambahProduction";
import {useRouter} from "next/navigation";
import lamdaData from "@/app/api/lamdaData";
import RumusData from "@/app/api/rumusData";
import {number} from "prop-types";
import EditRumus from "@/app/api/editRumus";


const Rumus = () => {

    const router = useRouter()
    const [formData, setForm] = useState({
        lamda: 0,
        lamda2: 0
    })

    useEffect(() => {
        const fetchRumus = async () => {
            const result = await RumusData()
            if (result) {
                setForm({
                    lamda: result.lamda,
                    lamda2: result.lamda2
                })
            }
        }
        fetchRumus()
    }, []);


    const handleChange = (e: any) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e: any) => {
        e.preventDefault()

        const result = await EditRumus(formData)
        if (result) {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil",
                text: "Rumus Berhasil Diubah",
                showConfirmButton: true
            })
            router.push("/forecasting")
        } else {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Gagal",
                text: "Rumus Gagal Diubah",
                showConfirmButton: true
            })
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Edit Rumus"}/>
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
                                <h5 className={"text-black-2 font-extrabold"}>Lamda 1</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"lamda"}
                                       type={"number"}
                                       step={"0.01"}
                                       value={formData.lamda}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Lamda 1"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Lamda 2</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"lamda2"}
                                       type={"number"}
                                       step={"0.01"}
                                       value={formData.lamda2}
                                       onChange={handleChange}
                                       placeholder={"Masukkan Lamda 2"} required={true}/>
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

export default Rumus