import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    Form,
    SimpleButton,
} from '@components'

export default () => {

    const [showSignUp, setShowSignUp] = useState(false)
    const authType = useMemo(() => showSignUp ? 'SIGN_UP' : 'SIGN_IN', [showSignUp])
    return (
        <View>
            <Form type={authType} />
            
            <SimpleButton
                label={authType === 'SIGN_IN' ? 'Sign Up' : 'Sign In'}
                onPress={() => setShowSignUp(!showSignUp)}
            />
        </View>
    )
}