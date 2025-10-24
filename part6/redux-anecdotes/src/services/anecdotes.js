const baseUrl = "http://localhost:3002/anecdotes"

export const getAll = async() => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error(`Response Status: ${response.status}`)
    }

    return await response.json()
}

export const createNew = async(content) => {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({content, votes: 0})
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok){
        throw new Error(`Response Status: ${response.status}`)
    }

    return await response.json()
}