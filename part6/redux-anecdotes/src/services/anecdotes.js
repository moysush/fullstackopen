const baseUrl = "http://localhost:3002/anecdotes"

export const getAll = async() => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error(`Response Status: ${response.status}`)
    }
    
    return await response.json()
}