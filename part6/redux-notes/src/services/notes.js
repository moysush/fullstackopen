const baseUrl = 'http://localhost:3001/notes'

export const getAll = async() => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('Failed to fetch ntoes')        
    }

    return  await response.json()
}