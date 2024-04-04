import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const useAuth = () => {
    console.log('using auth', UserContext)
    const [state, dispatch] = useContext(UserContext)
    console.log('auth state', state)
    if (!state.profile) {
        return null
    }
    return {
        dispatch,
        user: state.profile,
    }
}