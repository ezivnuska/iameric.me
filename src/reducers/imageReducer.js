export default (state, action) => {
    switch(action.type) {
        case 'SET_IMAGE':
            console.log('action.image', action.image)
            return action.image
            break
        case 'CLOSE_MODAL':
            return null
            break
        default:
            return state
    }
}