import React, { useEffect } from 'react'
import AuthFormView from './AuthFormView'
import { useForm, useModal, useSocket, useUser } from '@context'
import { signin, signup } from './utils'
import { setItem, storeToken } from '@utils/storage'

const AuthFormContainer = () => {
    
    const { user, setUser } = useUser()
    const {
        clearFormError,
        formError,
        formReady,
        resetForm,
        setFormError,
    } = useForm()
    const { closeModal } = useModal()
    const { notifySocket } = useSocket()

    useEffect(() => {
        if (user) handleModalClose()
    }, [user])

    const handleModalClose = () => {
        // if (authRoute) setAuthRoute(null)
        resetForm()
        closeModal()
    }

    const handleSignin = async ({ email, password }) => {
        
        const data = await signin(email, password)
        
        if (data.error) {
            // const { name, message } = data
            // const error = {
            //     name,
            //     message,
            // }
            // setFormError(error)
        } else if (data.user) {
            if (formError) clearFormError()
            await setItem('email', email)

            const { _id, token, username } = data.user
            
            storeToken(token)
            setUser(data.user)
            
            notifySocket('user_signed_in', {
                userId: _id,
                username,
            })
            // handleModalClose()
        }
        return data
    }

    const handleSignup = async ({ email, username, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            setFormError({
                name: 'confirmPassword',
                message: 'Passwords do not match.',
            })
        } else {
            const user = await signup(email, password, username)
            if (user) {
                await setItem('email', email)
    
                const { _id, token, username } = user
                
                storeToken(token)
                setUser(user)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
                
                // resetForm()
                
                return user
            }
        }
        return null
    }

    return (
        <AuthFormView
            ready={formReady}
            onCancel={handleModalClose}
            onSignIn={handleSignin}
            onSignUp={handleSignup}
            reset={resetForm}
        />
    )
}

export default AuthFormContainer