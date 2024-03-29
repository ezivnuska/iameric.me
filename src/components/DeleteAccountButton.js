import React, { useContext } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    IconButton,
} from '.'
import { AppContext } from '../AppContext'
import classes from '../styles/classes'

export default () => {

    const {
        dispatch,
        loading,
    } = useContext(AppContext)

    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <ThemedText
                style={[
                    classes.headerSecondary,
                    { marginBottom: 5 },
                ]}
            >
                Delete Account
            </ThemedText>
            
            <ThemedText
                style={{ marginBottom: 15 }}
            >
                We hate to see you go. Deleting your account 
                will permantly remove all images and data.
            </ThemedText>

            <IconButton
                type='danger'
                label='Delete Account'
                onPress={() => dispatch({ type: 'SET_MODAL', modalName: 'DESTROY' })}
                disabled={loading}
            />

        </View>
    )
}