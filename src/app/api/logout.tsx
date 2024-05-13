"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

async function Logout() {
    const token: any = cookies().get("token")
    if (token) {
        cookies().delete("token")
    }
    redirect("/login")
}

export default Logout