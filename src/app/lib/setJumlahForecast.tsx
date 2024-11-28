"use server"

async function setJumlahForecast(formData: any) {

    const response = await fetch(`${process.env.API_URL}/forecast/forecast/1`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    return await response.json()
}

export default setJumlahForecast