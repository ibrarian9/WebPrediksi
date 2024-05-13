"use client"

import {EnvelopeIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import authUser from "@/app/api/authUser";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2"

const Login = () => {

    const router = useRouter()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const result = await authUser(form)
        if (result.error) {
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Login Error",
                text: result.error,
                showConfirmButton: true
            })
        } else {
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Berhasil",
                showConfirmButton: true
            })
            router.push("/")
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-screen max-w-screen-2xl place-content-center
                items-center border border-stroke shadow-default">
                <div className="w-fit p-20">
                    <div className="bg-white px-20 py-10 rounded-xl">
                        <h1 className="text-center font-extrabold text-4xl pb-5">Login Prediksi</h1>
                        <form onSubmit={handleLogin}>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required={true}
                                />
                                <span className="absolute right-4 top-4">
                                    <EnvelopeIcon className="size-[22px]"/>
                                </span>
                            </div>

                            <div className="mb-6 mt-3">
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        min={8}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required={true}
                                    />
                                    <span className="absolute right-4 top-4">
                                        <LockClosedIcon className="size-[22px]"/>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                >
                                    Sign In
                                </button>
                            </div>
                            <Link href={"/register"} className="text-sm">
                                Tidak Punya Akun ? Daftar
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login