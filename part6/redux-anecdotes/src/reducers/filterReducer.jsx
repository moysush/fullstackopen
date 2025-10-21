export const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'filter': // will only return the payload.value if the type is 'filter'
            return action.payload.value
        default:
            return [...state]
    }
}

export const filterText = (value) => {
    return {
        type: 'filter',
        payload: {
            value: value
        }
    }
}