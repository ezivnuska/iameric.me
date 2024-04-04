import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'

export const useRequireAuth = (redirectUrl = '/signin') => {
    const auth = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!auth.user) {
            navigate.push(redirectUrl)
        } else {
            navigate.push(-1)
        }
    }, [auth, navigate])

    return auth
}