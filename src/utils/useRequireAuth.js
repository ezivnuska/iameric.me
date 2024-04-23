import { useEffect } from 'react'
import { useAuth } from '@context'
import { useNavigate } from 'react-router-dom'

export const useRequireAuth = (redirectUrl = '/') => {
    const auth = useAuth()
    console.log('auth', auth)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!auth.profile) {
            navigate.push(redirectUrl)
        } else {
            navigate.push(-1)
        }
    }, [auth, navigate])

    return () => auth
}