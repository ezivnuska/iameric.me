import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    FormInput,
    IconButton,
    ThemedText,
} from '.'
import { AppContext } from '../AppContext'
import { clearStorage } from '../utils/storage'
import { unsubscribe } from '../utils/auth'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [confirmationText, setConfirmationText] = useState('')

    const deleteAccount = async () => {

        if (!isValid()) return
        
        dispatch({ type: 'SET_LOADING', loading: 'Deleting account...' })
        
        await clearStorage()
        
        const response = await unsubscribe(user._id)
        
        dispatch({ type: 'SET_LOADING', loading: null })

        if (response) {

            if (response.success) {
                console.log('Successfully deleted account.')
                dispatch({ type: 'SIGNOUT' })
            } else if (response.msg) {
                console.log('Error unsubscribing:', response.msg)
            }
        } else {
            console.log('Error deleting account.')
        }
    }

    const onEnter = e => {
        if (e.code === 'Enter') {
            deleteAccount()
        }
    }

    const isValid = () => confirmationText === user.username
    
    return (
        <View>
            <View
                style={{ marginBottom: 20 }}
            >
                <ThemedText style={classes.headerSecondary}>
                    Delete Account and Data
                </ThemedText>

                <ThemedText>
                    Enter your username to close your account and 
                    permanently delete all of your data.
                </ThemedText>
            </View>

            <FormInput
                // label='Leave a comment'
                value={confirmationText}
                onChange={value => setConfirmationText(value)}
                placeholder='username'
                textContentType='none'
                autoCapitalize='none'
                keyboardType='default'
                onKeyPress={onEnter}
            />

            <IconButton
                type='danger'
                label='Delete Account'
                onPress={deleteAccount}
                disabled={!isValid()}
            />
        </View>
    )
}