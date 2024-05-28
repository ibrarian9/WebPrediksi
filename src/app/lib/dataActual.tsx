"use server"

import {cookies} from "next/headers";

async function dataActual() {

    const response = await fetch(`${process.env.API_URL}/dataActual`)
    const data = await response.json()

    const jumlahData = data.data.length

    cookies().set("jumlahData", jumlahData)

    return data
}

export default dataActual