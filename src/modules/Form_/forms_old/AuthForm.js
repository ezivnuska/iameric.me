import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, SimpleButton } from '@components'
import { useForm } from '@form'
import { useModal } from '@modal'
import { useSocket } from '@socket'
import { useUser } from '@user'
// import SignInForm from './SignInForm'
// import SignUpForm from './SignUpForm'
import { signin, signup } from './utils'
import { setItem, storeToken } from '@utils/storage'

const AuthForm = () => {
    
    const { setUser } = useUser()
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
            
            resetForm()
            closeModal()
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
                
                resetForm()
                closeModal()
                
                return user
            }
        }
        return null
    }
    
    return (
        <View style={{ gap: 10 }}>
            
            {showSignUp ? (
                <Form
                    fields={[
                        {
                            label: 'Email',
                            name: 'email',
                            placeholder: 'email...',
                            multiline: false,
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
                    onCancel={closeModal}
                    onSubmit={handleSignup}
                />
            ) : (
                <Form
                    fields={[
                        {
                            label: 'Email',
                            name: 'email',
                            placeholder: 'email',
                            multiline: false,
                        },
                        {
                            label: 'Password',
                            name: 'password',
                            placeholder: 'password',
                            multiline: false,
                            type: 'password',
                        },
                    ]}
                    onCancel={closeModal}
                    onSubmit={handleSignin}
                />
            )}

            <SimpleButton
                label={showSignUp ? 'Sign In' : 'Sign Up'}
                onPress={() => setShowSignUp(!showSignUp)}
                transparent
                color='tomato'
            />

        </View>
    )
}

export default AuthForm