import React, { useContext, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import defaultStyles from '../styles'
import { AppContext } from '../AppContext'
import { clearStorage } from '../Auth'

const DeleteAccountButton = () => {

    const {
        state,
        dispatch,
    } = useContext(AppContext)

    const { user } = state
    const [loading, setLoading] = useState(false)

    const handlePress = async () => {
        setLoading(true)
        await axios
			.post('/api/unsubscribe', { _id: user._id })
			.then(async ({ data }) => {
				setLoading(false)
                await clearStorage()
				dispatch({ type: 'SIGNOUT' })
			})
			.catch(err => {
				setLoading(false)
				console.log('Error deleting account.', err)
			})
    }

    return (
        <TouchableOpacity
            style={[defaultStyles.button, styles.container]}
            onPress={handlePress}
            disabled={loading}
        >
            <Text style={[defaultStyles.buttonLabel, loading ? defaultStyles.buttonLabelDisabled : null]}>
                Unsubscribe
            </Text>
            
        </TouchableOpacity>
    )
}

export default DeleteAccountButton

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
})