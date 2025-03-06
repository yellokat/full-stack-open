const initialFilter = ""

const reducer = (state = initialFilter, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload.filter
    default:
      return state
  }
}

export const setFilterActionCreator = (filterString) => {
  return {
    type:"SET_FILTER",
    payload:{
      filter:filterString
    }
  }
}

export default reducer