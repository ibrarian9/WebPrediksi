"use server"

import {cookies} from "next/headers";

async function userData() {
    const response = await fetch(`${process.env.API_URL}/auth/users`)

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    const data = await response.json()

    cookies().set("userCount", data.length)
    return data
}

export default userData