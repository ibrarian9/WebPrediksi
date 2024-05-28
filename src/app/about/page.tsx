import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const About = () => {

    const data = [
        {
            name: "Forecast", definition: "Peramalan (Forecasting) adalah suatu teknik analisa perhitungan\n" +
                "yang dilakukan dengan pendekatan kualitatif maupun kuantitatif untuk memperkirakan\n" +
                "kejadian dimasa depan dengan menggunakan referensi data-data di masa lalu untuk\n" +
                "meminimumkan pengaruh ketidakpastian. Peramalan itu sendiri bisa menjadi dasar bagi\n" +
                "perencanaan jangka pendek, menengah maupun jangka Panjang pada suatu perusahaan.\n" +
                "Peramalan juga merupakan alat bantu yang sangat penting dalam perencanaan yang efektif\n" +
                "dan efisien. "
        }, {
            name: "Smoothing", definition: "Metode Pemulusan (Smoothing) adalah metode\n" +
                "peramalan dengan mengadakan penghalusan atau pemulusan terhadap data masa lalu yaitu\n" +
                "dengan mengambil rata-rata dari nilai pada beberapa periode untuk menaksir nilai pada\n" +
                "suatu periode. Smoothing ini dilakukan dengan dua cara yaitu Moving Average atau\n" +
                "Exponential Smoothing."
        }, {
            name: "Metode double Exponential Smoothing", definition: "Untuk Parameter yang digunakan pada metode\n" +
                "double exponential smoothing dari Brown yaitu α yang memiliki nilai antara 0 dan 1. Apabila\n" +
                "data yang digunakan semakin banyak dalam perhitungan peramalannya maka percentage\n" +
                "error peramalannya akan semakin kecil, begitu juga sebaliknya. Untuk menentukan\n" +
                "forecasting pada metode ini dilakukan pengolahan data dengan mencari nilai pada :\n <br/> " +
                "1. Level Formula : L_t = αY_t + (1-a) ( L_(t-1) + T_(t-1) ) \n <br/>" +
                "2. Trend formula : T_t = β ( L_t - L(t-1) ) + (1-β) T_(t-1)"
        }
    ]

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"About"}/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className={"m-20"}>
                        {data.map((item) => (
                            <>
                                <h1 className={"text-2xl font-bold"}>{item.name}</h1>
                                <p className={"text-justify my-5"} dangerouslySetInnerHTML={
                                    {__html: item.definition}
                                }/>
                            </>
                        ))}
                        <br/>
                        <p className={"text-justify"}>Rumus Forecast Equation : Y_( t + m ) = L_t + mT_t</p>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default About