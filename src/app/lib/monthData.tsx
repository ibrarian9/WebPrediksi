async function monthData() {

    const response = await fetch(`${process.env.API_URL}/forecast/month`)

    return await response.json()
}

export default monthData;