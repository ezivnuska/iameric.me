export default (state, action) => {
    switch(action.type) {
        case 'SET_FEATURE':
            console.log('action.feature', action.feature)
            return action.feature
            break
        case 'CLOSE_MODAL':
            return null
            break
        default:
            return state
    }
}