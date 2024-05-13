import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const About = () => {
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName={"About"}/>
                <div className="overflow-hidden bg-white min-h-screen rounded-sm border
                border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div>
                        About
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default About