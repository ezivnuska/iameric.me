import React from 'react'
import {
    ButtonPrimary,
} from '.'

const AuthButton = ({ onPress, signin }) => (
    <ButtonPrimary
        label={signin ? 'Sign In' : 'Sign Up'}
        onPress={onPress}
    />
)

export default AuthButton
