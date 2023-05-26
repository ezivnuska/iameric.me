import React, { useState } from 'react'
import {
    StyleSheet,
} from 'react-native'
import {
    ButtonPrimary,
} from '.'
import axios from 'axios'

const GuestSigninButton = ({ setUser }) => {

    const [loading, setLoading] = useState(false)

    const handlePress = async () => {
        setLoading(true)
        await axios
			.post('/api/signin', {
                email: 'guest@iameric.me',
                password: 'iameric',
            })
			.then(({ data }) => {
				setLoading(false)
				setUser(data.user)
			})
			.catch(err => {
				setLoading(false)
				console.log('Error signing in as guest.', err)
			})
    }

    return (
        <ButtonPrimary
            label='Join as Guest'
            altLabel='Connecting...'
            disabled={loading}
            onPress={handlePress}
        />
    )
}

export default GuestSigninButton