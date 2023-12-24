import React, { useContext, useState } from 'react'
import {
    LoadingView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    PopUpModal,
} from '.'
import axios from 'axios'
import defaultStyles from '../styles/main'
import { AppContext } from '../AppContext'
import { clearStorage } from '../utils/storage'
import { Button } from 'antd'
import { unsubscribe } from '../Data'
import { navigate } from '../navigators/RootNavigation'

export default ({ id }) => {

    const {
        // state,
        dispatch,
        // user,
    } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const deleteAccount = async () => {
        setLoading('Deleting account...')
        await clearStorage()
        const response = await unsubscribe(id)
        // console.log('deleteAccount response:', response)
        setLoading(null)

        if (response && response.success) {
            console.log('Successfully deleted account.')
            dispatch({ type: 'SIGNOUT' })
        } else if (response && response.msg) {
            console.log('Unsub Error:', response.msg)
        } else if (!response) {
            console.log('Error deleting account.')
        } else {
            // console.log('account deletion response: ', response)
        }
    }

    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontWeight: 700,
                }}
            >
                Delete Account
            </Text>
            <Text
                style={{
                    marginVertical: 10,
                }}
            >
                We hate to see you go. 
                Deleting your account 
                will permantly remove 
                all images and data.
            </Text>

            <Button
                size='large'
                onClick={() => setModalVisible(true)}
                disabled={loading}
            >
                Delete Account
            </Button>

            <PopUpModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {!loading && (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Button
                                size='large'
                                type='primary'
                                danger
                                onClick={deleteAccount}
                            >
                                Delete Account
                            </Button>
                        </View>
                    )
                }
            </PopUpModal>
            
        </View>
    )
}