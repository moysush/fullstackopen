// this reducer just stores and updates the filter state
export const filterReducer = (state = 'ALL', action) => {
// console.log('ACTION', action);
    // dispatch jodi SET_FILTER hoy taile state update hobe else default state ashbe
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

// action creator
export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

