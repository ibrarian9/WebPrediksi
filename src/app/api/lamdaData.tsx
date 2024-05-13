"use server"

async function lambdaData() {
    const response = await fetch(`${process.env.API_URL}/forecast/rumus/1`)

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return await response.json()
}

export default lambdaData()