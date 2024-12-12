import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Form, SimpleButton } from '@components'

const AuthFormView = ({
    ready,
    onCancel,
    onSignIn,
    onSignUp,
    reset,
    type = 'in',
}) => {
    
    const [formType, setFormType] = useState(type)

    const toggleFormType = () => {
        setFormType(formType === 'in' ? 'up' : 'in')
    }

    useEffect(() => {
        if (type !== formType) setFormType(type)
    }, [type])

    useEffect(() => {
        if (ready) reset()
    }, [formType])
    
    return (
        
        // <View
        //     style={{
        //         flex: 1,
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         zIndex: 100,
        //     }}
        // >
        //     <View
        //         style={{
        //             width: '92%',
        //             maxWidth: 380,
        //             marginHorizontal: 'auto',
        //             backgroundColor: '#fff',
        //             borderRadius: 10,
        //             overflow: 'hidden',
        //             zIndex: 100,
        //         }}
        //     >
                <View
                    style={{
                        flexGrow: 1,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        gap: 10,
                    }}
                >
            
                    {formType === 'up' ? (
                        <Form
                            title='Sign Up'
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
                            onCancel={onCancel}
                            onSubmit={onSignUp}
                        />
                    ) : (
                        <Form
                            title='Sign In'
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
                            onCancel={onCancel}
                            onSubmit={onSignIn}
                        />
                    )}

                    <SimpleButton
                        label={formType === 'up' ? 'Sign In' : 'Sign Up'}
                        onPress={toggleFormType}
                        color='tomato'
                    />

                </View>
        //     </View>
        // </View>
    )
}

export default AuthFormView