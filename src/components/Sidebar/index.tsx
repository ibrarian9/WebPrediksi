"use client";

import React, {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {
    Squares2X2Icon,
    TableCellsIcon,
    DocumentTextIcon,
    UsersIcon,
    ExclamationCircleIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
    const pathname = usePathname();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    let storedSidebarExpanded = "true";

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({key}: KeyboardEvent) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-start gap-2 px-6 py-5.5 lg:py-6.5">
                <h1
                    className="text-white font-extrabold text-lg">
                    Forecasting Perolehan Minyak menggunakan Metode Double
                    Exponential Smoothing</h1>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <ArrowLeftIcon className="size-[20px]"/>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <Link
                                    href={"/"}
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname === "/" &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <Squares2X2Icon className="size-[20px]"/>
                                    Dashboard
                                </Link>
                            </li>
                            {/* <!-- Menu Item Dashboard --> */}

                            {/* <!-- Menu Item Data Aktual --> */}
                            <li>
                                <Link
                                    href={"/data"}
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("data") && "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <TableCellsIcon className="size-[20px]"/>
                                    Data Aktual
                                </Link>
                            </li>
                            {/* <!-- Menu Item Data Aktual --> */}

                            {/* <!-- Menu Item Forecasting --> */}
                            <li>
                                <Link
                                    href={"/forecasting"}
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("forecasting") && "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <DocumentTextIcon className="size-[20px]"/>
                                    Forecasting
                                </Link>
                            </li>
                            {/* <!-- Menu Item Forecasting --> */}

                        </ul>

                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            LAINNYA
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <Link
                                    href={"/akun"}
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("akun") &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <UsersIcon className="size-[20px]"/>
                                    Akun
                                </Link>
                            </li>
                            {/* <!-- Menu Item Dashboard --> */}

                            {/* <!-- Menu Item Data Aktual --> */}
                            <li>
                                <Link
                                    href={"/about"}
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                        pathname.includes("about") && "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <ExclamationCircleIcon className="size-[20px]"/>
                                    About
                                </Link>
                            </li>
                            {/* <!-- Menu Item Data Aktual --> */}
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
