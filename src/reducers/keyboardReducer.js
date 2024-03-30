export default (state, action) => {
    // alert('keyboard action', action)
    switch(action.type) {
        case 'SET_KEYBOARD_STATUS':
            return action.visible
            break
        default:
            return state
    }
}