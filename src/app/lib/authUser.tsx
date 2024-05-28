"use server"

import {cookies} from "next/headers";

async function authUser(form: { email: string, password: string }) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })

        const data = await response.json()

        if (!response.ok) {
            if (data.message === "Bad credentials") {
                return {error: "Username or Password is Incorrect."};
            }
            return {error: data.message ?? "An error occurred during login."};
        }

        // Set cookie
        cookies().set("token", data.token)

        return {data};
    } catch (e: any) {
        console.error("Error", e);
        return {error: e.message || "An unexpected error occurred."};
    }
}

export default authUser