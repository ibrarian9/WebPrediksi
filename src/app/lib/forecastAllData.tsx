"use server"

import {cookies} from "next/headers";

async function forecastAllData() {

    const response = await fetch(`${process.env.API_URL}/forecast/products`)

    const data = await response.json()

    cookies().set("products", data.data.length)

    return data
}

export default forecastAllData