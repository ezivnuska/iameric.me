import React from 'react'
import {
    View,
} from 'react-native'
import {
    SignInForm,
} from './components'

export default ({ type }) => {

    const renderForm = type => {
        switch(type) {
            case 'SIGN_IN': return <SignInForm />; break
            default: return null
        }
    }

    return (
        <View>
            {renderForm(type)}
        </View>
    )
}