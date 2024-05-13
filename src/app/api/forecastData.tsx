"use server"

async function forecastData() {
    const response = await fetch(`${process.env.API_URL}/forecast/product`)

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return response.json()
}

export default forecastData