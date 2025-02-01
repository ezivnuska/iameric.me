import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Card, IconButton } from 'react-native-paper'
import { Form } from '@components'
import { useForm, useModal, useSocket, useUser } from '@context'
import { signup, signin } from '@utils/auth'
import { setItem, storeToken } from '@utils/storage'

const AuthForm = () => {
    
    const { authUser, setUser, signinUser } = useUser()
    const {
        formError,
        formReady,
        clearFormError,
        resetForm,
        setFormError,
    } = useForm()
    const { closeModal } = useModal()
    const { notifySocket } = useSocket()
        
    const [formType, setFormType] = useState('in')

    useEffect(() => {
        if (formReady) resetForm()
    }, [formType])

    useEffect(() => {
        if (authUser) handleModalClose()
    }, [authUser])

    const toggleFormType = () => {
        setFormType(formType === 'in' ? 'up' : 'in')
    }

    const handleModalClose = () => {
        // if (authRoute) setAuthRoute(null)
        resetForm()
        closeModal()
    }

    const handleSignin = async ({ email, password }) => {
        
        const response = await signin(email, password)
        // const connectedUser = await signin(email, password)
        
        
        if (response) {

            // console.log('response:', response)
            if (response.error) {
                console.log('SignIn Error:', response.msg)
                setFormError({
                    name: response.invalidField,
                    message: response.msg,
                })
            } else if (response.user) {

                if (formError) clearFormError()
    
                const { _id, username } = response.user
    
                setUser(response.user)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
    
                handleModalClose()
            }
        } else {
            return null
        }
    }

    const handleSignup = async ({ email, username, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            setFormError({
                name: 'confirmPassword',
                message: 'Passwords do not match.',
            })
        } else {
            const newUser = await signup(email, password, username)
            if (newUser) {
                await setItem('email', email)
    
                const { _id, token, username } = newUser
                
                storeToken(token)
                setUser(newUser)
                
                notifySocket('user_signed_in', {
                    userId: _id,
                    username,
                })
                
                // resetForm()
                
                return newUser
            }
        }
        return null
    }

    return (
        <Card>

            <Card.Title
                title={formType === 'up' ? 'Sign Up' : 'Sign In'}
                titleVariant='headlineLarge'
                right={() => <IconButton icon='close-thick' onPress={closeModal} />}
            />

            <Card.Content style={{ marginTop: 10 }}>
                {formType === 'up'
                    ? <SignUpForm onCancel={handleModalClose} onSubmit={handleSignup} />
                    : <SignInForm onCancel={handleModalClose} onSubmit={handleSignin} />
                }
            </Card.Content>

            <Card.Actions style={{ flexDirection: 'column', alignItems: 'stretch', marginVertical: 10 }}>
                <Button
                    mode='outlined'
                    onPress={toggleFormType}
                >
                    {formType === 'up' ? 'Sign In' : 'Sign Up'}
                </Button>    
            </Card.Actions>

        </Card>
    )
    // return (
    //     <View
    //         style={{
    //             flexGrow: 1,
    //             paddingHorizontal: 10,
    //             paddingVertical: 10,
    //             gap: 10,
    //         }}
    //     >
    
    //         {formType === 'up'
    //             ? <SignUpForm onCancel={handleModalClose} onSubmit={handleSignup} />
    //             : <SignInForm onCancel={handleModalClose} onSubmit={handleSignin} />
    //         }

    //         <Button
    //             mode='outlined'
    //             onPress={toggleFormType}
    //         >
    //             {formType === 'up' ? 'Sign In' : 'Sign Up'}
    //         </Button>

    //     </View>
    // )
}

const SignUpForm = ({ onCancel, onSubmit }) => {
    
    const fields = [
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
    ]

    return (
        <Form
            title='Sign Up'
            fields={fields}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

const SignInForm = ({ onCancel, onSubmit }) => {
    
    const fields = [
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
    ]

    return (
        <Form
            title='Sign In'
            fields={fields}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    )
}

export default AuthForm