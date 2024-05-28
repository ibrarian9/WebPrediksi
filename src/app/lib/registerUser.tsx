"use server"

async function registerUser(formData: {
    email: string;
    nama: string;
    password: string;
    username: string,
    roles: string
}) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
            if (data.message === "Bad credentials") {
                return {error: "Register Error"};
            }
            return {error: data.message ?? "An error occurred during Register"};
        }

        return {data};
    } catch (e: any) {
        console.error("Error", e);
        return {error: e.message || "An unexpected error occurred."};
    }
}

export default registerUser