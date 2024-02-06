import React, { useContext, useState } from 'react'
import {
    View,
} from 'react-native'
import {
    ThemedText,
    FormInput,
    IconButton,
    LoadingView,
    PopUpModal,
} from '.'
import defaultStyles from '../styles/main'
import { AppContext } from '../AppContext'
import { clearStorage } from '../utils/storage'
import { unsubscribe } from '../utils/auth'
import classes from '../styles/classes'

export default ({ id }) => {

    const {
        dispatch,
        user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmationText, setConfirmationText] = useState('')

    const deleteAccount = async () => {

        if (!isValid()) return
        
        setLoading('Deleting account...')
        
        await clearStorage()
        
        const response = await unsubscribe(id)
        
        setLoading(null)

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
                onPress={() => setModalVisible(true)}
                disabled={loading}
            />

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {!loading ? (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                        >
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
                                onChangeText={value => setConfirmationText(value)}
                                placeholder='username'
                                textContentType='none'
                                autoCapitalize='none'
                                keyboardType='default'
                                style={defaultStyles.input}
                                onKeyPress={onEnter}
                            />

                            <IconButton
                                type='danger'
                                label='Delete Account'
                                onPress={deleteAccount}
                                disabled={!isValid()}
                            />
                        </View>
                    ) : (
                        <LoadingView label={loading} />
                    )
                }
            </PopUpModal>
        </View>
    )
}