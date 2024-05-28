async function rumusData() {

    const response = await fetch(`${process.env.API_URL}/forecast/rumus/1`)

    return await response.json()
}

export default rumusData