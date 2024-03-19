export default (state, action) => {
    switch(action.type) {
        case 'SET_MODAL':
            const newModal = {
                type: action.modalType,
                id: action.id || null,
            }
            console.log('SET_MODAL(newModal)', newModal)
            return newModal
            break
        case 'CLOSE_MODAL':
            return null
            break
        // move
        // case 'SET_FEATURE':
        //     state.feature = action.feature
        //     state.modal = 'SHOW_PRODUCT'
        //     break
        // case 'SET_PROFILE':
        //     state.profile = action.profile
        //     break
        default:
            return state
    }
}