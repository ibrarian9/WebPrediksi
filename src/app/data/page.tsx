import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

const Data = () => {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Data Aktual"/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"flex justify-end m-3"}>
                        <Link className={"py-2 px-3 bg-blue-700 text-white rounded-xl"} href={"/data/tambah"}>
                            Tambah Data
                        </Link>
                    </div>
                    <div className={"mx-20"}>
                        <table className={"w-full table-auto"}>
                            <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Waktu
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Month
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Laju Produksi
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white text-center">
                                    Actions
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr className={"border-2"}>
                                <td className={"border-2"}>2000</td>
                                <td className={"border-2"}>2000</td>
                                <td className={"border-2"}>2000</td>
                                <td className={"border-2"}></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Data