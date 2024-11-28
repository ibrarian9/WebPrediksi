"use server"

async function jumlahForecast() {

    const response = await fetch(`${process.env.API_URL}/forecast/forecast/1`)

    return await response.json()
}

export default jumlahForecast