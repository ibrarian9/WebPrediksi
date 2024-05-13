"use client"

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {ArrowLeftStartOnRectangleIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import Logout from "@/app/api/logout";
import {useRouter} from "next/navigation"
import {UserCircleIcon} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";

interface DecodedToken {
    sub: string;
    role: string;
}

const DropdownUser = () => {

    const token: any = Cookies.get("token")
    const decode = jwtDecode<DecodedToken>(token)
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    const handleLogout = () => {
        Swal.fire({
            title: "Logout",
            text: "Are you sure Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                Logout().then(() =>
                    Swal.fire({
                        title: "Logout",
                        text: "Logout Success!",
                        icon: "success"
                    }).then(() => router.push("/login"))
                )
            }
        })
    }

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            if (!dropdownOpen || event.key !== 'Escape') return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <div className="relative">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                href="#"
            >
            <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                    {decode.sub.toString().toUpperCase()}
                </span>
                <span className="block text-xs">{decode.role}</span>
            </span>
                <span className="h-12 w-12 rounded-full">
                    <UserCircleIcon className="size-[112px] w-auto h-auto"/>
                </span>
                <ChevronDownIcon className="hidden sm:block size-[18px]"/>
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                    dropdownOpen ? "block" : "hidden"
                }`}
            >
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3.5 px-3 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                    <ArrowLeftStartOnRectangleIcon className="size-[22px]"/>
                    Log Out
                </button>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DropdownUser;
