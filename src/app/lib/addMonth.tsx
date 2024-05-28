"use server"

async function AddMonth(formData: any) {

    const response = await fetch(`${process.env.API_URL}/forecast/month/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    return response.json()
}

export default AddMonth