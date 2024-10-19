import React, { useState } from 'react'
import { View } from 'react-native'
import { SimpleButton } from '@components'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const AuthForm = () => {
    
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <View style={{ gap: 10 }}>
            
            {showSignUp
                ? <SignUpForm />
                : <SignInForm />
            }

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