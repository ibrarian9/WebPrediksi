"use server"

async function EditRumus(formData: any) {

    const response = await fetch(`${process.env.API_URL}/forecast/rumus/1`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error("Failed to fetch data")
    }

    return data
}

export default EditRumus