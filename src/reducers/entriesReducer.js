export default (state, action) => {
    switch(action.type) {
        case 'ADD_ENTRY':
            return [action.entry, ...state]
            break
        case 'SET_ENTRIES':
            return action.entries
            break
        case 'DELETE_ENTRY':
            return state.filter(entry => entry._id !== action.entryId)
            break
        default:
            return state
    }
}