"use client"

import {EnvelopeIcon, UserIcon, LockClosedIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import registerUser from "@/app/api/registerUser";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

const Register = () => {

    const router = useRouter()
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        nama: "",
        email: "",
        password: "",
        roles: "ROLE_USER"
    })

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: any) => {
        e.preventDefault()
        const result = await registerUser(formData)
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
            router.push("/login")
        }

    }

    return (
        <>
            <div className="flex flex-col min-h-screen max-w-screen-2xl place-content-center
                            items-center border border-stroke shadow-default">
                <div className="w-fit p-20">
                    <div className="bg-white px-20 py-10 rounded-xl">
                        <h1 className="text-center font-extrabold text-4xl pb-5">Daftar Akun</h1>
                        <form onSubmit={handleRegister}>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required={true}
                                />
                                <span className="absolute right-4 top-4">
                                    <EnvelopeIcon className="size-[24px]"/>
                                </span>
                            </div>

                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    name="nama"
                                    placeholder="Enter your Name"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    min={5}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required={true}
                                />
                                <span className="absolute right-4 top-4">
                                    <UserCircleIcon className="size-[24px]"/>
                                </span>
                            </div>

                            <div className="relative my-3">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    min={5}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required={true}
                                />
                                <span className="absolute right-4 top-4">
                                  <UserIcon className="size-[24px]"/>
                                </span>
                            </div>

                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        min={8}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required={true}
                                    />

                                    <input
                                        type="text"
                                        name="text"
                                        placeholder="Enter your roles"
                                        value={formData.roles}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary hidden"
                                        required={true}
                                    />


                                    <span className="absolute right-4 top-4">
                                      <LockClosedIcon className="size-[24px]"/>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-2">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <Link href={"/login"} className="text-sm">
                                Sudah Punya Akun ? Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register