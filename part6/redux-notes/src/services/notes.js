const baseUrl = 'http://localhost:3001/notes'

export const getAll = async() => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Failed to fetch ntoes')        
    }

    return  await response.json()
}

export const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, important: false})
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok){
        throw new Error('Failed to create note')
    }

    return await response.json()
}

export const updateNote = async(id, content, important) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, important: !important})
    }

    const response = await fetch(`${baseUrl}/${id}`, options)

    if(!response.ok){
        throw new Error('Can not update the note')
    }

    return await response.json()
}