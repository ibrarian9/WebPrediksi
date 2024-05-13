"use server"

async function rumusData() {
    const response = await fetch(`${process.env.API_URL}/forecast/rumus/1`)

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return response.json()
}

export default rumusData