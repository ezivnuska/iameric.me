import React, { useContext, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    FormInput,
    LoadingView,
    PopUpModal,
} from '.'
import defaultStyles from '../styles/main'
import { AppContext } from '../AppContext'
import { clearStorage } from '../utils/storage'
import { Button } from 'antd'
import { unsubscribe } from '../Data'

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
            <Text
                style={{
                    fontWeight: 700,
                    marginBottom: 5,
                }}
            >
                Delete Account
            </Text>
            
            <Text
                style={{
                    marginBottom: 15,
                }}
            >
                We hate to see you go. 
                Deleting your account 
                will permantly remove 
                all images and data.
            </Text>

            <Button
                size='large'
                type='primary'
                danger
                onClick={() => setModalVisible(true)}
                disabled={loading}
            >
                Delete Account
            </Button>

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

                            <Button
                                size='large'
                                type='primary'
                                danger
                                onClick={deleteAccount}
                                disabled={!isValid()}
                            >
                                Delete Account
                            </Button>
                        </View>
                    ) : (
                        <LoadingView label={loading} />
                    )
                }
            </PopUpModal>
        </View>
    )
}