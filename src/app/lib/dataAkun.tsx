"use server"

import {cookies} from "next/headers";

async function dataAkun() {

    const response = await fetch(`${process.env.API_URL}/auth/users`)
    const data = await response.json()

    const jumlahUser = data.data.length

    cookies().set("jumlahUser", jumlahUser)

    return data
}

export default dataAkun