import type {Metadata} from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
    title: "PREDIKSI PERTANIAN",
    description: "Generated by create next app",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <Dashboard/>
            </DefaultLayout>
        </>
    );
}
