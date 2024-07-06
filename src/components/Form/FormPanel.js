import React from 'react'
import {
    View,
} from 'react-native'
import {
    DestroyForm,
    SignInForm,
    SignUpForm,
} from './forms'

export default ({ type }) => {

    const renderForm = type => {
        switch(type) {
            case 'DESTROY': return <DestroyForm />; break
            case 'SIGN_IN': return <SignInForm />; break
            case 'SIGN_UP': return <SignUpForm />; break
            default: return null
        }
    }

    return (
        <View>
            {renderForm(type)}
        </View>
    )
}