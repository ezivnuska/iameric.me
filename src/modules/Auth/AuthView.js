import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, SimpleButton } from '@components'
import { useApp } from '@app'
import { useForm } from '@form'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { useUser } from '@user'
import { signin, signup } from './utils'
import { setItem, storeToken } from '@utils/storage'

const AuthView = () => {
    
    const { authRoute, setAuthRoute } = useApp()
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

    const [showSignUp, setShowSignUp] = useState(false)

    useEffect(() => {
        if (formReady) resetForm()
    }, [showSignUp])

    useEffect(() => {
        if (user) {
            handleModalClose()
        }
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
        <View style={{ gap: 10 }}>
            
            {showSignUp ? (
                <Form
                    tile='Join'
                    fields={[
                        {
                            label: 'Email',
                            name: 'email',
                            placeholder: 'email...',
                            multiline: false,
                            autoCapitalize: 'none',
                        },
                        {
                            label: 'Username',
                            name: 'username',
                            placeholder: 'username...',
                            multiline: false,
                        },
                        {
                            label: 'Password',
                            name: 'password',
                            placeholder: 'password...',
                            multiline: false,
                            type: 'password',
                        },
                        {
                            label: 'Confirm Password',
                            name: 'confirmPassword',
                            placeholder: 'password again...',
                            multiline: false,
                            type: 'password',
                        },
                    ]}
                    onCancel={handleModalClose}
                    onSubmit={handleSignup}
                />
            ) : (
                <Form
                    title='Log In'
                    fields={[
                        {
                            label: 'Email',
                            name: 'email',
                            placeholder: 'email',
                            multiline: false,
                            autoCapitalize: 'none',
                        },
                        {
                            label: 'Password',
                            name: 'password',
                            placeholder: 'password',
                            multiline: false,
                            type: 'password',
                        },
                    ]}
                    onCancel={handleModalClose}
                    onSubmit={handleSignin}
                />
            )}

            <SimpleButton
                label={showSignUp ? 'Sign In' : 'Sign Up'}
                onPress={() => setShowSignUp(!showSignUp)}
                color='tomato'
            />

        </View>
    )
}

export default AuthView