import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import defaultStyles from '../styles'

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
        <TouchableOpacity
            style={[defaultStyles.button, styles.container]}
            onPress={handlePress}
            disabled={loading}
        >
            <Text style={[defaultStyles.buttonLabel, loading ? defaultStyles.buttonLabelDisabled : null]}>
                Or, join as guest
            </Text>
            
        </TouchableOpacity>
    )
}

export default GuestSigninButton

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
})