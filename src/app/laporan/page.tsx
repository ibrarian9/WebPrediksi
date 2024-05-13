import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Laporan = () => {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"Laporan"}/>
                <div
                    className="overflow-hidden bg-white min-h-screen rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div>
                        <div className={"mx-20 my-5"}>
                            <table className={"w-full table-auto"}>
                                <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                        Test
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Test
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Test
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                <td>

                                </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}
export default Laporan