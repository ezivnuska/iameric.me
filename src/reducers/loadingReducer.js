export default (state, action) => {
    switch(action.type) {
        case 'SET_LOADING':
            return action.loading
            break
        default:
            return state
    }
}