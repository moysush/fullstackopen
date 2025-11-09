const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error("anecdotes couldn't be retrieved")
    }

    return response.json()
}

export const createAnecdote = async(newAnecdote) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok){
        throw new Error("Coudn't create new anecdote")
    }

    return response.json()
}

export const updateAnecdote = async(updatedAnecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedAnecdote)
    }

    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

    if(!response.ok){
        throw new Error("Coudn't update the anecdote")
    }

    return response.json()
}