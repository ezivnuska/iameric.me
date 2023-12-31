import React, { useContext, useState } from 'react'
import {
    Text,
    View,
} from 'react-native'
import {
    LoadingView,
    PopUpModal,
} from '.'
import { Button } from 'antd'
import axios from 'axios'
import { AppContext } from '../AppContext'
// import { navigate } from '@navigators/RootNavigation'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanStorage } from '../utils/storage'

export default () => {

    const {
        dispatch,
        loading,
        user,
    } = useContext(AppContext)

    const [modalVisible, setModalVisible] = useState(false)

    const signout = async () => {

        dispatch({ type: 'SET_LOADING', loading: 'Signing out...' })
        
        const { data } = await axios
            .post('/api/signout', { _id: user._id })
        
        if (!data) {
            console.log('could not sign out user')
            return
        }
        
        await cleanStorage()
        
        dispatch({ type: 'SET_LOADING', loading: null })
        
        dispatch({ type: 'SIGNOUT' })
    }

    const validateClose = () => {
        if (!loading) setModalVisible(false)
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
                    marginBottom: 5,
                }}
            >
                Sign Out
            </Text>

            <Text
                style={{
                    marginBottom: 15,
                }}
            >
                See you next time!
            </Text>

            <Button
                size='large'
                type='default'
                onClick={() => setModalVisible(true)}
                disabled={loading}
            >
                Sign Out
            </Button>

            <PopUpModal
                visible={modalVisible}
                onRequestClose={validateClose}
            >
                {!loading
                    ? (
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
                                onClick={signout}
                            >
                                Sign Out
                            </Button>
                        </View>
                    ) : (
                        <LoadingView />
                    )
                }
            </PopUpModal>
        </View>
    )
}