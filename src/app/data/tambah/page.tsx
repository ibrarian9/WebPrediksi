"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

const Tambah = () => {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Tambah Data Aktual"}/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border flex justify-center
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"w-4/5 h-fit"}>
                        <div className={"flex justify-end pt-5"}>
                            <Link className={"py-2 px-3 bg-yellow-400 text-black-2 hover:bg-yellow-500 rounded-xl"}
                                  href={"/data"}>
                                Kembali
                            </Link>
                        </div>
                        <form>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Tahun</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"tahun"}
                                       placeholder={"tahun"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Luas Panen</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"luas"}
                                       placeholder={"Masukkan Luas"} required={true}/>
                            </div>
                            <div className="py-2.5">
                                <h5 className={"text-black-2 font-extrabold"}>Tahun</h5>
                                <input className={"w-full border-2 border-black p-2 rounded-md hover:border-blue-500"}
                                       name={"Produksi Minyak"}
                                       placeholder={"Masukkan Produksi Minyak"} required={true}/>
                            </div>
                            <div className={"flex justify-start py-2.5"}>
                                <Link className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} href={"/data/tambah"}>
                                    Tambah Data
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </DefaultLayout>
        </>
    )
}

export default Tambah